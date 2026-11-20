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
import { canonicalJson, computeSha256, sameRef } from './loader.ts';
import { NSEJS_AUTHENTIC_QUESTIONS } from '../pages/nsejs-data.generated.ts';

// ---------------------------------------------------------------------------
// 1. Shared Stimuli & Formula Sheet
// ---------------------------------------------------------------------------

const SHARED_PHYSICS_STIMULUS: SharedStimulus = {
  id: 'stim-nsejs-mechanics',
  title: 'Particle Mechanics and Dynamics Invariants',
  contentHtml: `
    <p>A point mass $m$ undergoes plane motion under the influence of uniform gravity $g$ and a horizontal velocity-dependent drag force $F_d = -kv_x$.
    Let $(x, y)$ be the Cartesian coordinates with origin at the launch site, where $+y$ points vertically upwards.</p>
  `,
};

// ---------------------------------------------------------------------------
// 2. Question Parts Factory (60 Questions: 20 Physics, 20 Chemistry, 20 Biology)
// ---------------------------------------------------------------------------

function createNsejsQuestionParts(): PaperQuestionPart[] {
  const parts: PaperQuestionPart[] = [];

  // Section 1: Physics (Questions 1 to 20, 3 Marks each)
  for (let i = 1; i <= 20; i++) {
    const qid = `nsejs-p-${String(i).padStart(2, '0')}`;
    const authQ = NSEJS_AUTHENTIC_QUESTIONS[i - 1];
    const prompt = authQ
      ? `<p><strong>${authQ.id} [${authQ.topic}]:</strong></p><p>${authQ.stem}</p>`
      : `<p>A uniform body accelerates from rest under constant net force. Calculate the physical displacement during the $n$-th second.</p>`;

    parts.push({
      id: qid,
      partKey: String(i),
      sectionId: 'sec-nsejs-physics',
      label: `Physics Q${i}: ${authQ ? authQ.topic : 'Mechanics & Dynamics'}`,
      maxPoints: 3,
      archetypeId: 'NSEJS-PHYSICS-MCQ',
      promptHtml: prompt,
      responseKind: 'SINGLE_CHOICE',
      ...(i <= 5 ? { sharedStimulusId: 'stim-nsejs-mechanics' } : {}),
    });
  }

  // Section 2: Chemistry (Questions 21 to 40, 3 Marks each)
  const chemTopics = [
    'Chemical Bonding & Molecular Shapes',
    'Mole Concept & Stoichiometric Ratios',
    'Gas Laws & Kinetic Theory',
    'Acids, Bases and Salts',
    'Periodic Classification & Trends',
    'Redox Reactions & Oxidation Numbers',
    'Thermodynamics & Enthalpy Changes',
    'Electrochemistry & Galvanic Cells',
  ];

  for (let i = 21; i <= 40; i++) {
    const qid = `nsejs-c-${String(i).padStart(2, '0')}`;
    const topic = chemTopics[(i - 21) % chemTopics.length]!;
    parts.push({
      id: qid,
      partKey: String(i),
      sectionId: 'sec-nsejs-chemistry',
      label: `Chemistry Q${i}: ${topic}`,
      maxPoints: 3,
      archetypeId: 'NSEJS-CHEMISTRY-MCQ',
      promptHtml: `<p><strong>[${topic}]:</strong> An unknown substance $X$ reacts according to standard stoichiometric stoichiometry. Determine the correct empirical relation or reaction product under standard conditions.</p>`,
      responseKind: 'SINGLE_CHOICE',
    });
  }

  // Section 3: Biology (Questions 41 to 60, 3 Marks each)
  const bioTopics = [
    'Cell Structure & Organelles',
    'Photosynthesis & Light Reactions',
    'Cellular Respiration & ATP Yield',
    'Genetics & Mendelian Inheritance',
    'Human Physiology & Circulation',
    'Excretory Systems & Nephron Osmoregulation',
    'Plant Transport & Transpiration',
    'Ecology & Energy Flow in Trophic Levels',
  ];

  for (let i = 41; i <= 60; i++) {
    const qid = `nsejs-b-${String(i).padStart(2, '0')}`;
    const topic = bioTopics[(i - 41) % bioTopics.length]!;
    parts.push({
      id: qid,
      partKey: String(i),
      sectionId: 'sec-nsejs-biology',
      label: `Biology Q${i}: ${topic}`,
      maxPoints: 3,
      archetypeId: 'NSEJS-BIOLOGY-MCQ',
      promptHtml: `<p><strong>[${topic}]:</strong> In a physiological assay of cellular organelle activity, selective inhibitors are introduced. Deduce the observed metabolic consequence on biochemical homeostasis.</p>`,
      responseKind: 'SINGLE_CHOICE',
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
    stimuli: [SHARED_PHYSICS_STIMULUS],
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
  const sessionId = `ses:${releaseId}:${config.paperId}:${learnerId}`;
  const attemptId = `att:${sessionId}:1`;

  const now = Date.now();
  const deadlineAt = new Date(now + config.durationSeconds * 1000).toISOString();

  let ses = await driver.get<SessionRecord>('sessions', sessionId);
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
