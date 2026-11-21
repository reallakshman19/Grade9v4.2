/**
 * web/runtime/nsejs-session.ts
 * Wave 11 — Authentic Authority Chain & Session Factory for NSEJS 2-Hour Mock Paper 1.
 *
 * Implements:
 * - Official IAPT NSEJS Examination Structure:
 *   60 multiple-choice questions, 180 marks total (+3 correct, -1 incorrect, 0 unattempted),
 *   120-minute absolute countdown timer.
 *   Section 1: Physics (20 questions, 60 marks)
 *   Section 2: Chemistry (20 questions, 60 marks)
 *   Section 3: Biology (20 questions, 60 marks)
 * - Single choice option domain: ['A', 'B', 'C', 'D']
 * - Aids enforcement: FORMULA_SHEET and SCRATCHPAD permitted (Calculators strictly forbidden)
 * - Complete PaperBinding registered with StandardAssessmentEngine under SIMULATED_EXAM policy
 * - Sealed REVIEW_PENDING diagnostic evaluation
 *
 * Fault N09 Answer Isolation: Raw keys withheld; scores and answers sealed by examination policy.
 * No academic approval inferred from software validation.
 */

import type { Ref, TaskRef, Kind, Session as SessionRecord } from './types.ts';
import type {
  PaperWorkspaceConfig,
  PaperBinding,
  PaperQuestionPart,
  SharedStimulus,
} from '../pages/paper.ts';
import { paperDefinitionDigest } from '../pages/paper.ts';
import { StandardAssessmentEngine, type AssessmentContract } from './assessment.ts';
import { DefaultProgressStore } from './progress.ts';
import { Session as DurableSessionController } from './session.ts';
import { createStorageDriver, type StorageDriver } from './storage.ts';
import {paperBaseSessionId, activePaperSessionId, beginFreshPaperAttempt} from './paper-attempts.ts';
import { canonicalJson, computeSha256, sameRef } from './loader.ts';
import { NSEJS_MOCK1_QUESTIONS } from '../pages/nsejs-mock1-data.ts';

// ---------------------------------------------------------------------------
// 1. Shared Stimuli & Reference Constants
// ---------------------------------------------------------------------------

const SHARED_PHYSICS_STIMULUS: SharedStimulus = {
  id: 'stim-nsejs-mechanics',
  title: 'Particle Mechanics and Dynamics Invariants',
  contentHtml: `
    <p>A point mass $m$ undergoes plane motion under the influence of uniform gravity $g$ and a horizontal velocity-dependent drag force $F_d = -kv_x$.
    Let $(x, y)$ be the Cartesian coordinates with origin at the launch site, where $+y$ points vertically upwards.</p>
  `,
};

const SHARED_CHEMISTRY_STIMULUS: SharedStimulus = {
  id: 'stim-nsejs-chemistry',
  title: 'Thermodynamics & Solution Equilibria Reference',
  contentHtml: `
    <p>All standard thermodynamic quantities ($\Delta H^\circ, S^\circ, \Delta G^\circ$) are evaluated at $T = 298.15\text{ K}$ and $P = 1.0\text{ bar}$.
    Faraday constant $F = 96,500\text{ C/mol}$. Universal gas constant $R = 8.314\text{ J/(mol}\cdot\text{K)} = 0.0821\text{ L}\cdot\text{atm/(mol}\cdot\text{K)}$.</p>
  `,
};

const SHARED_BIOLOGY_STIMULUS: SharedStimulus = {
  id: 'stim-nsejs-biology',
  title: 'Cellular Energetics & Metabolic Assay Controls',
  contentHtml: `
    <p>In mitochondrial respiration assays, uncouplers (e.g., DNP) dissipate the transmembrane electrochemical proton gradient ($\Delta\mu_{\text{H}^+}$) without directly inhibiting electron transport complexes I–IV, whereas oligomycin directly blocks the $F_0$ proton channel of ATP synthase.</p>
  `,
};

// ---------------------------------------------------------------------------
// 2. Question Parts Factory (60 Questions: 20 Physics, 20 Chemistry, 20 Biology)
// ---------------------------------------------------------------------------

function createNsejsQuestionParts(): PaperQuestionPart[] {
  const parts: PaperQuestionPart[] = [];

  for (let i = 1; i <= 60; i++) {
    const q = NSEJS_MOCK1_QUESTIONS[i - 1];
    if (!q) {
      throw new Error(`Missing mock question item at index ${i - 1}`);
    }

    let qid: string;
    let secId: string;
    let labelPrefix: string;
    let archetypeId: string;
    let stimulusId: string | undefined;

    if (i <= 20) {
      qid = `nsejs-p-${String(i).padStart(2, '0')}`;
      secId = 'sec-nsejs-physics';
      labelPrefix = `Physics Q${i}: ${q.topic}`;
      archetypeId = 'NSEJS-PHYSICS-MCQ';
      if (i <= 5) stimulusId = 'stim-nsejs-mechanics';
    } else if (i <= 40) {
      qid = `nsejs-c-${String(i).padStart(2, '0')}`;
      secId = 'sec-nsejs-chemistry';
      labelPrefix = `Chemistry Q${i}: ${q.topic}`;
      archetypeId = 'NSEJS-CHEMISTRY-MCQ';
      if (i >= 21 && i <= 25) stimulusId = 'stim-nsejs-chemistry';
    } else {
      qid = `nsejs-b-${String(i).padStart(2, '0')}`;
      secId = 'sec-nsejs-biology';
      labelPrefix = `Biology Q${i}: ${q.topic}`;
      archetypeId = 'NSEJS-BIOLOGY-MCQ';
      if (i >= 41 && i <= 45) stimulusId = 'stim-nsejs-biology';
    }

    const promptHtml = `<p><strong>Question ${i} [${q.topic}]:</strong></p><p>${q.stem}</p><ul><li><strong>(A)</strong> ${q.options[0]}</li><li><strong>(B)</strong> ${q.options[1]}</li><li><strong>(C)</strong> ${q.options[2]}</li><li><strong>(D)</strong> ${q.options[3]}</li></ul>`;

    parts.push({
      id: qid,
      partKey: String(i),
      sectionId: secId,
      label: labelPrefix,
      maxPoints: 3,
      archetypeId,
      promptHtml,
      responseKind: 'SINGLE_CHOICE',
      ...(stimulusId ? { sharedStimulusId: stimulusId } : {}),
    });
  }

  return parts;
}

// ---------------------------------------------------------------------------
// 3. Workspace Configuration
// ---------------------------------------------------------------------------

export function createNsejsPaperWorkspaceConfig(): PaperWorkspaceConfig {
  const parts = createNsejsQuestionParts();

  return {
    paperId: 'paper:nsejs-2024-mock-1',
    paperTitle: 'NSEJS 2024 Full-Length Simulated Mock Paper 1',
    durationSeconds: 7200, // 120 minutes (2 hours)
    sections: [
      {
        id: 'sec-nsejs-physics',
        title: 'Section 1: Physics (Q1–Q20 · 60 Marks)',
        instructions: 'Single choice (+3 for correct, -1 for incorrect, 0 for unattempted). 20 questions.',
        partIds: parts.filter((p) => p.sectionId === 'sec-nsejs-physics').map((p) => p.id),
      },
      {
        id: 'sec-nsejs-chemistry',
        title: 'Section 2: Chemistry (Q21–Q40 · 60 Marks)',
        instructions: 'Single choice (+3 for correct, -1 for incorrect, 0 for unattempted). 20 questions.',
        partIds: parts.filter((p) => p.sectionId === 'sec-nsejs-chemistry').map((p) => p.id),
      },
      {
        id: 'sec-nsejs-biology',
        title: 'Section 3: Biology (Q41–Q60 · 60 Marks)',
        instructions: 'Single choice (+3 for correct, -1 for incorrect, 0 for unattempted). 20 questions.',
        partIds: parts.filter((p) => p.sectionId === 'sec-nsejs-biology').map((p) => p.id),
      },
    ],
    parts,
    stimuli: [SHARED_PHYSICS_STIMULUS, SHARED_CHEMISTRY_STIMULUS, SHARED_BIOLOGY_STIMULUS],
    allowedAids: ['FORMULA_SHEET', 'SCRATCHPAD'],
  };
}

// ---------------------------------------------------------------------------
// 4. Authority Factory: createAuthorizedNsejsPaperSession
// ---------------------------------------------------------------------------

export async function createAuthorizedNsejsPaperSession(
  learnerId: string = 'diagnostic_learner',
  customDriver?: StorageDriver
): Promise<{ config: PaperWorkspaceConfig; binding: PaperBinding }> {
  const config = createNsejsPaperWorkspaceConfig();
  const definitionSha256 = await paperDefinitionDigest(config);

  const paper: Ref<'PAPER'> = {
    type: 'PAPER',
    id: config.paperId,
    revision: 1,
    sha256: definitionSha256,
  };

  const task: TaskRef = {
    type: 'QUESTION',
    id: 'task:nsejs-2024-mock-1',
    revision: 1,
    sha256: await computeSha256(canonicalJson({ id: 'task:nsejs-2024-mock-1', parts: config.parts.map((p) => p.id) })),
  };

  const assessment: Ref<'ASSESSMENT'> = {
    type: 'ASSESSMENT',
    id: 'asm:nsejs-2024-mock-1',
    revision: 1,
    sha256: '0'.repeat(64),
  };

  // Construct multipart contract for StandardAssessmentEngine
  const contractParts: Record<string, AssessmentContract> = {};
  for (const p of config.parts) {
    contractParts[p.id] = {
      id: p.id,
      task_ref: task,
      response_kind: 'SINGLE_CHOICE',
      max_points: p.maxPoints,
      evaluator: {
        mode: 'REVIEW_PENDING',
      },
    };
  }

  const assessmentContract: AssessmentContract = {
    id: assessment.id,
    revision: assessment.revision,
    task_ref: task,
    response_kind: 'MULTIPART',
    max_points: 180,
    evaluator: {
      mode: 'REVIEW_PENDING',
    },
    parts: contractParts,
  };

  const contractSha = await computeSha256(canonicalJson(assessmentContract));
  const authorizedAssessment: Ref<'ASSESSMENT'> = {
    ...assessment,
    sha256: contractSha,
  };

  const engine = new StandardAssessmentEngine([{ assessment: authorizedAssessment, task }]);
  await engine.registerContract(assessmentContract, authorizedAssessment);

  const driver = customDriver || createStorageDriver({ dbName: 'grade9_nsejs_runtime' });

  const releaseId = 'rel-nsejs-2024-v1';
  const rootSessionId = paperBaseSessionId(releaseId, config.paperId, learnerId);
  let sessionId = await activePaperSessionId(driver, rootSessionId);
  let attemptId = `att:${sessionId}:1`;

  const now = Date.now();
  const deadlineAt = new Date(now + config.durationSeconds * 1000).toISOString();

  let ses = await driver.get<SessionRecord>('sessions', sessionId);
  // A content revision cannot bind to a past attempt. Rotate the active
  // pointer while retaining historical sessions, draft bytes and receipts.
  if (ses && ses.origin?.sha256 !== definitionSha256) {
    sessionId = await beginFreshPaperAttempt(driver, rootSessionId);
    attemptId = `att:${sessionId}:1`;
    ses = await driver.get<SessionRecord>('sessions', sessionId);
  }

  // An expired uncommitted session must remain recoverable/read-only. Never
  // silently erase it on page reload; the learner explicitly starts a retake.
  if (!ses) {
    ses = {
      id: sessionId,
      releaseId,
      item: task,
      mode: 'SIMULATED_EXAM',
      contentRevision: `rev:${task.revision}`,
      origin: { type: 'PAPER', id: config.paperId, revision: 1, sha256: definitionSha256 },
      returnRoute: '/competitive/exam:nsejs',
      cursor: 0,
      attemptIds: [],
      draftId: null,
      deadlineAt,
    };
    await driver.put('sessions', sessionId, ses);
  }

  const progress = new DefaultProgressStore(
    driver,
    async (a) =>
      a.releaseId === releaseId &&
      sameRef(a.item, task) &&
      sameRef(a.assessmentRef!, authorizedAssessment) &&
      a.scoringVersion === 'g9-scoring/1.1' &&
      canonicalJson(a.grade) === canonicalJson(await engine.evaluate(a.response, authorizedAssessment, 'SIMULATED_EXAM', task))
  );

  const session = new DurableSessionController(
    { sessionId: ses.id, releaseId, item: task, mode: 'SIMULATED_EXAM' },
    driver,
    progress,
    {
      liveRevision: async () => `rev:${task.revision}`,
      reviewedDisclosure: async () => false,
    }
  );

  const binding: PaperBinding = {
    paper,
    definitionSha256,
    task,
    assessment: authorizedAssessment,
    releaseId,
    attemptId,
    session,
    progress,
    engine,
    verifyRequiredAssets: async () => true,
  };

  return { config, binding };
}
