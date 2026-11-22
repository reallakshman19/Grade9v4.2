/**
 * tests/runtime/test_active_session_persistence.spec.ts
 * Rigorous Unit & Integration Verification of Learner Session Persistence and Dashboard Resumption.
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import {
  DEFAULT_ACTIVE_SESSION,
  getActiveLearnerSession,
  recordActiveLearnerSession,
  formatSessionTime,
  clearActiveLearnerSession,
  type ActiveLearnerSession,
} from '../../web/runtime/learner-activity.ts';

import {
  createDashboardScreen,
  type RegistrySnapshot,
  DEFAULT_CURRICULUM_REGISTRY,
} from '../../web/pages/home.ts';

describe('Learner Session Persistence & Reactivity Engine', () => {
  it('returns canonical default session when no session is recorded in storage', () => {
    const session = getActiveLearnerSession();
    assert.ok(session !== null);
    assert.ok(session.sessionId.length > 0);
    assert.ok(session.title.includes('Work, Power & Energy'));
    assert.equal(typeof session.progressPercent, 'number');
    assert.equal(typeof session.route, 'string');
  });

  it('formats temporal relativity accurately', () => {
    const nowIso = new Date().toISOString();
    assert.equal(formatSessionTime(nowIso), 'Active just now');

    const fiveMinsAgoIso = new Date(Date.now() - 5 * 60 * 1000).toISOString();
    assert.equal(formatSessionTime(fiveMinsAgoIso), 'Active 5 mins ago');

    const oneMinAgoIso = new Date(Date.now() - 60 * 1000).toISOString();
    assert.equal(formatSessionTime(oneMinAgoIso), 'Active 1 min ago');

    const yesterdayIso = new Date(Date.now() - 25 * 3600 * 1000).toISOString();
    assert.ok(formatSessionTime(yesterdayIso).startsWith('Active on'));
  });

  it('persists and updates active session dynamically into DashboardScreenController', () => {
    const controller = createDashboardScreen(DEFAULT_CURRICULUM_REGISTRY);

    // Initial state check
    const initialHtml = controller.renderHtml();
    assert.ok(initialHtml.includes('Last Active Session'));
    assert.ok(initialHtml.includes('Physics — Work, Power &amp; Energy (Core 1A)'));

    // Learner advances in Chemistry Redox module
    const chemistrySession: ActiveLearnerSession = {
      sessionId: 'session:chemistry:redox:core1a',
      subjectId: 'subject:chemistry',
      topicId: 'topic:redox',
      title: 'Chemistry — Redox Reactions & Oxidation States (Core 1A)',
      route: '/subject/chemistry/topic/redox/learn-try',
      progressPercent: 78,
      lastActiveAt: new Date().toISOString(),
      statusText: 'Section A7: Galvanic Cells',
      role: 'CORE1A',
    };

    // Update controller anchor
    controller.setResumeAnchor({
      sessionId: chemistrySession.sessionId,
      subjectId: chemistrySession.subjectId,
      topicId: chemistrySession.topicId,
      title: chemistrySession.title,
      route: chemistrySession.route,
      progressPercent: chemistrySession.progressPercent,
      lastActiveAt: chemistrySession.lastActiveAt,
      statusText: chemistrySession.statusText,
      role: chemistrySession.role,
    });

    const updatedHtml = controller.renderHtml();
    assert.ok(updatedHtml.includes('Chemistry — Redox Reactions &amp; Oxidation States (Core 1A)'));
    assert.ok(updatedHtml.includes('Topic: <strong>topic:redox</strong>'));
    assert.ok(updatedHtml.includes('78% Progress'));
    assert.ok(updatedHtml.includes('aria-valuenow="78"'));
    assert.ok(updatedHtml.includes('width: 78%;'));
    assert.ok(updatedHtml.includes('data-nav="/subject/chemistry/topic/redox/learn-try"'));
    assert.ok(updatedHtml.includes('Section A7: Galvanic Cells'));
  });

  it('updates accurately when an exam paper is in progress', () => {
    const controller = createDashboardScreen(DEFAULT_CURRICULUM_REGISTRY);

    const examSession: ActiveLearnerSession = {
      sessionId: 'session:paper:ioqm-2024',
      subjectId: 'subject:competitive',
      topicId: 'paper:ioqm-2024',
      title: 'Competitive — IOQM 2024 Challenge Paper A',
      route: '/practice/paper:ioqm:2024:challenge_a',
      progressPercent: 60,
      lastActiveAt: new Date().toISOString(),
      statusText: '18/30 Questions Answered',
      role: 'EXAM',
    };

    controller.setResumeAnchor({
      sessionId: examSession.sessionId,
      subjectId: examSession.subjectId,
      topicId: examSession.topicId,
      title: examSession.title,
      route: examSession.route,
      progressPercent: examSession.progressPercent,
      lastActiveAt: examSession.lastActiveAt,
      statusText: examSession.statusText,
      role: examSession.role,
    });

    const updatedHtml = controller.renderHtml();
    assert.ok(updatedHtml.includes('Competitive — IOQM 2024 Challenge Paper A'));
    assert.ok(updatedHtml.includes('60% Progress'));
    assert.ok(updatedHtml.includes('aria-valuenow="60"'));
    assert.ok(updatedHtml.includes('width: 60%;'));
    assert.ok(updatedHtml.includes('data-nav="/practice/paper:ioqm:2024:challenge_a"'));
    assert.ok(updatedHtml.includes('18/30 Questions Answered'));
  });
});
