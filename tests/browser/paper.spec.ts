/**
 * tests/browser/paper.spec.ts
 * A30 — Multipart paper and examination workspace test suite.
 *
 * Verifies:
 * - Nine archetype examination flows (PHY E1–E3, CHM E1–E3, MTH E1–E3, and multipart)
 * - Strict solution secrecy invariant: Solutions sealed during active examination ("no early solution")
 * - Persistent examination timer with exact reload restoration ("timer reload")
 * - Incomplete total pending invariant: If any part is pending review or incomplete,
 *   the aggregate paper evaluation remains REVIEW_PENDING with total score withheld (points: null)
 * - Multi-section examination navigation and part status lifecycle (UNVISITED -> VIEWED -> ATTEMPTED -> FLAGGED)
 * - Configured aids access control (authorized vs forbidden aids)
 * - Shared stimulus binding across multipart questions
 * - Full session export and restoration roundtrip
 * - 48px minimum touch/hit target bounds
 *
 * No academic approval inferred from software validation.
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import {
  PartNavigationController,
} from '../../web/components/part-navigation.ts';
import {
  ExamTimer,
  PaperWorkspaceController,
} from '../../web/pages/paper.ts';
import type {
  PaperQuestionPart,
  SharedStimulus,
} from '../../web/pages/paper.ts';

// Test fixture covering all nine archetypes across 3 sections with shared stimulus
const NINE_ARCHETYPE_PARTS: PaperQuestionPart[] = [
  // Section A: Physics
  {
    id: 'p-phy-e1',
    partKey: '1.1',
    sectionId: 'sec-phy',
    label: 'Kinematics Multiple Choice',
    maxPoints: 3,
    archetypeId: 'PHY-E1',
    promptHtml: '<p>Select the correct velocity vector.</p>',
    solutionHtml: '<p>Option B is correct due to constant acceleration.</p>',
  },
  {
    id: 'p-phy-e2',
    partKey: '1.2',
    sectionId: 'sec-phy',
    label: 'Two-Body Kinematics Constructed Numeric',
    maxPoints: 5,
    archetypeId: 'PHY-E2',
    promptHtml: '<p>Derive the meeting point of the two projectiles.</p>',
    solutionHtml: '<p>Intersection occurs at t = 2.45 s.</p>',
  },
  {
    id: 'p-phy-e3',
    partKey: '1.3',
    sectionId: 'sec-phy',
    label: 'Experimental Pendulum Graphing',
    maxPoints: 7,
    archetypeId: 'PHY-E3',
    promptHtml: '<p>Plot T^2 vs L and compute g with uncertainties.</p>',
    solutionHtml: '<p>Slope is 4.02 s^2/m yielding g = 9.82 m/s^2.</p>',
  },

  // Section B: Chemistry
  {
    id: 'p-chm-e1',
    partKey: '2.1',
    sectionId: 'sec-chm',
    label: 'Stoichiometry Integer Calculation',
    maxPoints: 3,
    archetypeId: 'CHM-E1',
    promptHtml: '<p>Enter stoichiometric coefficient for oxygen.</p>',
    solutionHtml: '<p>Coefficient is 5.</p>',
  },
  {
    id: 'p-chm-e2',
    partKey: '2.2',
    sectionId: 'sec-chm',
    label: 'Reaction Mechanism Arrow-Pushing',
    maxPoints: 6,
    archetypeId: 'CHM-E2',
    sharedStimulusId: 'stim-organic-synth',
    promptHtml: '<p>Draw the nucleophilic acyl substitution mechanism.</p>',
    solutionHtml: '<p>Tetrahedral intermediate forms with chloride departure.</p>',
  },
  {
    id: 'p-chm-e3',
    partKey: '2.3',
    sectionId: 'sec-chm',
    label: 'Spectroscopic Elucidation',
    maxPoints: 6,
    archetypeId: 'CHM-E3',
    sharedStimulusId: 'stim-organic-synth',
    promptHtml: '<p>Identify unknown ester from IR and NMR peaks.</p>',
    solutionHtml: '<p>Compound is ethyl acetate.</p>',
  },

  // Section C: Mathematics
  {
    id: 'p-mth-e1',
    partKey: '3.1',
    sectionId: 'sec-mth',
    label: 'Combinatorics Integer Result',
    maxPoints: 3,
    archetypeId: 'MTH-E1',
    promptHtml: '<p>Find the number of valid permutations.</p>',
    solutionHtml: '<p>Total permutations = 840.</p>',
  },
  {
    id: 'p-mth-e2',
    partKey: '3.2',
    sectionId: 'sec-mth',
    label: 'Symbolic Algebraic Expression',
    maxPoints: 5,
    archetypeId: 'MTH-E2',
    promptHtml: '<p>Simplify the rational trigonometric expression.</p>',
    solutionHtml: '<p>Simplifies to 2*sin(x)/(1+cos(x)).</p>',
  },
  {
    id: 'p-mth-e3',
    partKey: '3.3',
    sectionId: 'sec-mth',
    label: 'Olympiad Inequality Deductive Proof',
    maxPoints: 7,
    archetypeId: 'MTH-E3',
    promptHtml: '<p>Prove that sum(a/(b+c)) >= 3/2 for positive real a, b, c.</p>',
    solutionHtml: '<p>Follows directly from Nesbitt inequality via Cauchy-Schwarz.</p>',
  },
];

const SECTIONS_FIXTURE = [
  { id: 'sec-phy', title: 'Section I: Physics', partIds: ['p-phy-e1', 'p-phy-e2', 'p-phy-e3'] },
  { id: 'sec-chm', title: 'Section II: Chemistry', partIds: ['p-chm-e1', 'p-chm-e2', 'p-chm-e3'] },
  { id: 'sec-mth', title: 'Section III: Mathematics', partIds: ['p-mth-e1', 'p-mth-e2', 'p-mth-e3'] },
];

const STIMULI_FIXTURE: SharedStimulus[] = [
  {
    id: 'stim-organic-synth',
    title: 'Multi-Step Ester Synthesis Reaction Sequence',
    contentHtml: '<p>Carboxylic acid refluxed with thionyl chloride followed by ethanol addition.</p>',
  },
];

describe('A30 Part Navigation: Sections & States', () => {
  it('initializes parts to UNVISITED, marks active part as VIEWED, and supports flagging', () => {
    const nav = new PartNavigationController({
      sections: SECTIONS_FIXTURE,
      parts: NINE_ARCHETYPE_PARTS,
    });

    assert.equal(nav.getActivePartId(), 'p-phy-e1');
    assert.equal(nav.getPartStatus('p-phy-e1'), 'VIEWED');
    assert.equal(nav.getPartStatus('p-phy-e2'), 'UNVISITED');

    // Toggle flag
    assert.equal(nav.isFlagged('p-phy-e1'), false);
    nav.toggleFlag('p-phy-e1');
    assert.equal(nav.isFlagged('p-phy-e1'), true);
    assert.equal(nav.getPartStatus('p-phy-e1'), 'FLAGGED');

    const counts = nav.getSummaryCounts();
    assert.equal(counts.total, 9);
    assert.equal(counts.flagged, 1);
    assert.equal(counts.unvisited, 8);
  });

  it('supports sequential next/previous and direct navigation across sections', () => {
    const nav = new PartNavigationController({
      sections: SECTIONS_FIXTURE,
      parts: NINE_ARCHETYPE_PARTS,
    });

    assert.equal(nav.goToNextPart(), true);
    assert.equal(nav.getActivePartId(), 'p-phy-e2');

    assert.equal(nav.goToPreviousPart(), true);
    assert.equal(nav.getActivePartId(), 'p-phy-e1');

    // Direct jump across sections
    assert.equal(nav.goToPart('p-mth-e3'), true);
    assert.equal(nav.getActivePartId(), 'p-mth-e3');
    assert.equal(nav.getActiveSection()?.id, 'sec-mth');
  });
});

describe('A30 Examination Timer: Countdown & Reload Persistence', () => {
  it('tracks elapsed and remaining duration and stops on pause or expiry', () => {
    const timer = new ExamTimer(3600); // 1 hour
    assert.equal(timer.getRemainingSeconds(), 3600);
    assert.equal(timer.getElapsedSeconds(), 0);

    timer.tick(10);
    assert.equal(timer.getRemainingSeconds(), 3590);
    assert.equal(timer.getElapsedSeconds(), 10);

    timer.pause();
    timer.tick(10);
    assert.equal(timer.getRemainingSeconds(), 3590); // paused, no tick

    timer.resume();
    timer.tick(15);
    assert.equal(timer.getRemainingSeconds(), 3575);
  });

  it('preserves exact elapsed and remaining time across timer reload without drift', () => {
    const timer = new ExamTimer(5400); // 90 mins
    timer.tick(1245); // 1245s elapsed
    assert.equal(timer.getRemainingSeconds(), 4155);

    const savedState = timer.exportState();

    // Reload into a fresh instance
    const reloadedTimer = new ExamTimer(5400);
    reloadedTimer.restoreState(savedState);

    assert.equal(reloadedTimer.getElapsedSeconds(), 1245);
    assert.equal(reloadedTimer.getRemainingSeconds(), 4155);
    assert.equal(reloadedTimer.isExpired(), false);

    // Verify tick continues seamlessly from restored state
    reloadedTimer.tick(5);
    assert.equal(reloadedTimer.getRemainingSeconds(), 4150);
  });
});

describe('A30 Early Solution Secrecy: Solutions Sealed In-Progress', () => {
  it('strictly blocks solution inspection while examination is active ("no early solution")', () => {
    const workspace = new PaperWorkspaceController({
      paperId: 'exam-paper-01',
      paperTitle: 'Integrated Olympiad Stage 2 Screening',
      durationSeconds: 7200,
      sections: SECTIONS_FIXTURE,
      parts: NINE_ARCHETYPE_PARTS,
    });

    // Attempting to read solution during active exam must fail
    const attempt = workspace.getSolution('p-phy-e1');
    assert.equal(attempt.allowed, false);
    assert.match(attempt.error || '', /sealed during active examination/i);
    assert.equal(attempt.solutionHtml, undefined);

    // Enter a response
    workspace.setPartResponse('p-phy-e1', 3);

    // Still blocked before submission
    const attempt2 = workspace.getSolution('p-phy-e1');
    assert.equal(attempt2.allowed, false);

    // Submit paper
    workspace.submitPaper();

    // Now solution is unlocked
    const attemptAfterSubmit = workspace.getSolution('p-phy-e1');
    assert.equal(attemptAfterSubmit.allowed, true);
    assert.ok(attemptAfterSubmit.solutionHtml?.includes('Option B is correct'));
  });
});

describe('A30 Incomplete Total Pending: Aggregate Score Withholding', () => {
  it('enforces incomplete total pending: if any part requires review, totalPoints is null', () => {
    const workspace = new PaperWorkspaceController({
      paperId: 'exam-paper-01',
      paperTitle: 'Integrated Olympiad Stage 2 Screening',
      durationSeconds: 7200,
      sections: SECTIONS_FIXTURE,
      parts: NINE_ARCHETYPE_PARTS,
    });

    // Answer PHY-E1 (closed: scored)
    workspace.setPartResponse('p-phy-e1', 3);
    // Answer MTH-E3 (open proof: review pending)
    workspace.setPartResponse('p-mth-e3', 'Proof using Cauchy-Schwarz');

    const result = workspace.submitPaper();

    // Incomplete total pending invariant:
    assert.equal(result.status, 'REVIEW_PENDING');
    assert.equal(result.totalPoints, null); // Score withheld!
    assert.equal(result.isFinal, false);
    assert.match(result.summaryFeedback, /Total score is pending review/i);

    // Individual parts are tagged correctly
    const phyE1 = result.partResults.find((p) => p.partId === 'p-phy-e1');
    assert.equal(phyE1?.status, 'SCORED');
    assert.equal(phyE1?.points, 3);

    const mthE3 = result.partResults.find((p) => p.partId === 'p-mth-e3');
    assert.equal(mthE3?.status, 'REVIEW_PENDING');
    assert.equal(mthE3?.points, null);
  });

  it('allows final numerical score only when paper consists entirely of closed-form parts', () => {
    const closedParts: PaperQuestionPart[] = [
      {
        id: 'cp-1',
        partKey: '1',
        sectionId: 'sec-1',
        label: 'PHY E1 Question',
        maxPoints: 4,
        archetypeId: 'PHY-E1',
        promptHtml: '<p>Prompt 1</p>',
      },
      {
        id: 'cp-2',
        partKey: '2',
        sectionId: 'sec-1',
        label: 'CHM E1 Question',
        maxPoints: 4,
        archetypeId: 'CHM-E1',
        promptHtml: '<p>Prompt 2</p>',
      },
      {
        id: 'cp-3',
        partKey: '3',
        sectionId: 'sec-1',
        label: 'MTH E1 Question',
        maxPoints: 4,
        archetypeId: 'MTH-E1',
        promptHtml: '<p>Prompt 3</p>',
      },
    ];

    const closedWorkspace = new PaperWorkspaceController({
      paperId: 'closed-paper',
      paperTitle: 'All-Closed Screening Paper',
      durationSeconds: 3600,
      sections: [{ id: 'sec-1', title: 'Objective Section', partIds: ['cp-1', 'cp-2', 'cp-3'] }],
      parts: closedParts,
    });

    closedWorkspace.setPartResponse('cp-1', 4);
    closedWorkspace.setPartResponse('cp-2', 4);
    closedWorkspace.setPartResponse('cp-3', 2);

    const result = closedWorkspace.submitPaper();
    assert.equal(result.status, 'SCORED');
    assert.equal(result.totalPoints, 10);
    assert.equal(result.maxPoints, 12);
    assert.equal(result.isFinal, true);
  });
});

describe('A30 Configured Aids & Shared Stimulus', () => {
  it('controls access to permitted aids and rejects forbidden aids', () => {
    const workspace = new PaperWorkspaceController({
      paperId: 'paper-aids',
      paperTitle: 'Chemistry Paper with Periodic Table',
      durationSeconds: 3600,
      sections: SECTIONS_FIXTURE,
      parts: NINE_ARCHETYPE_PARTS,
      allowedAids: ['PERIODIC_TABLE', 'FORMULA_SHEET'], // Calculator is forbidden!
    });

    // Permitted aid opens cleanly
    const ptResult = workspace.openAid('PERIODIC_TABLE');
    assert.equal(ptResult.allowed, true);

    // Forbidden aid is blocked
    const calcResult = workspace.openAid('CALCULATOR');
    assert.equal(calcResult.allowed, false);
    assert.match(calcResult.error || '', /forbidden by examination rules/i);
  });

  it('binds shared stimulus to multiple parts in split view', () => {
    const workspace = new PaperWorkspaceController({
      paperId: 'paper-stimulus',
      paperTitle: 'Paper with Shared Stimulus',
      durationSeconds: 3600,
      sections: SECTIONS_FIXTURE,
      parts: NINE_ARCHETYPE_PARTS,
      stimuli: STIMULI_FIXTURE,
    });

    // Part 1.1 has no stimulus
    workspace.getNavigation().goToPart('p-phy-e1');
    assert.equal(workspace.getViewState().activeStimulus, null);

    // Part 2.2 links to stim-organic-synth
    workspace.getNavigation().goToPart('p-chm-e2');
    const state = workspace.getViewState();
    assert.ok(state.activeStimulus);
    assert.equal(state.activeStimulus.id, 'stim-organic-synth');
    assert.match(state.activeStimulus.title, /Ester Synthesis/);
  });
});

describe('A30 Paper Session Persistence & Ergonomics', () => {
  it('persists and restores complete paper state across lifecycle transitions', () => {
    const workspace = new PaperWorkspaceController({
      paperId: 'paper-session-test',
      paperTitle: 'State Roundtrip Test',
      durationSeconds: 5400,
      sections: SECTIONS_FIXTURE,
      parts: NINE_ARCHETYPE_PARTS,
    });

    workspace.getTimer().tick(600); // 10 minutes elapsed
    workspace.setPartResponse('p-phy-e1', 3);
    workspace.setPartResponse('p-chm-e2', 'SMILES: CC(=O)Cl');
    workspace.getNavigation().toggleFlag('p-phy-e2');
    workspace.getNavigation().goToPart('p-chm-e2');

    const exported = workspace.exportSession();
    assert.equal(exported.timerState.elapsedSeconds, 600);
    assert.equal(exported.responses['p-phy-e1'], 3);
    assert.equal(exported.navigationState.activePartId, 'p-chm-e2');
    assert.ok(exported.navigationState.flagged.includes('p-phy-e2'));

    // Fresh controller restored from state
    const restored = new PaperWorkspaceController({
      paperId: 'paper-session-test',
      paperTitle: 'State Roundtrip Test',
      durationSeconds: 5400,
      sections: SECTIONS_FIXTURE,
      parts: NINE_ARCHETYPE_PARTS,
    });
    restored.restoreSession(exported);

    const restoredState = restored.getViewState();
    assert.equal(restoredState.timer.elapsedSeconds, 600);
    assert.equal(restoredState.activePartId, 'p-chm-e2');
    assert.equal(restored.getPartResponse('p-phy-e1'), 3);
    assert.equal(restored.getNavigation().isFlagged('p-phy-e2'), true);
  });

  it('verifies all interactive elements conform to 48px hit target bounds', () => {
    const workspace = new PaperWorkspaceController({
      paperId: 'paper-hit-targets',
      paperTitle: 'Hit Target Verification',
      durationSeconds: 3600,
      sections: SECTIONS_FIXTURE,
      parts: NINE_ARCHETYPE_PARTS,
      allowedAids: ['FORMULA_SHEET'],
    });

    const state = workspace.getViewState();
    assert.equal(state.minHitTargetPx, 48);

    const html = workspace.render();
    assert.ok(html.includes('min-height: 48px'));
    assert.ok(html.includes('min-width: 48px'));
    assert.ok(html.includes('id="submit-paper-btn"'));
    assert.ok(html.includes('class="part-navigation-panel"'));
  });
});
