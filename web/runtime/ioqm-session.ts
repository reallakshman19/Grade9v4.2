/**
 * web/runtime/ioqm-session.ts
 * A30 — Authentic Authority Chain & Session Factory for IOQM Challenge Paper A.
 *
 * Implements:
 * - Official 2024 HBCSE IOQM Paper Structure:
 *   30 integer-answer questions, 100 marks total, 180-minute absolute deadline.
 *   Section A: 10 x 2-mark questions (parts 1-10)
 *   Section B: 10 x 3-mark questions (parts 11-20)
 *   Section C: 10 x 5-mark questions (parts 21-30)
 * - Integer response validation strictly bounded to [00..99]
 * - Prohibited aids enforcement: strictly SCRATCHPAD only (no calculators)
 * - Complete PaperBinding authority chain registered with StandardAssessmentEngine under SIMULATED_EXAM policy
 * - Sealed REVIEW_PENDING diagnostic evaluation
 *
 * No academic approval inferred from software validation.
 */

import type { Ref, TaskRef, Kind } from './types.ts';
import type { PaperWorkspaceConfig, PaperBinding, PaperQuestionPart, SharedStimulus } from '../pages/paper.ts';
import { paperDefinitionDigest } from '../pages/paper.ts';
import { StandardAssessmentEngine, type AssessmentContract } from './assessment.ts';
import { DefaultProgressStore } from './progress.ts';
import { Session as DurableSessionController } from './session.ts';
import { acquireAuthorizedPaperRun } from './paper-run.ts';
import { createStorageDriver, type StorageDriver } from './storage.ts';
import { canonicalJson, computeSha256, sameRef } from './loader.ts';

// ---------------------------------------------------------------------------
// 1. IOQM Integer Answer Domain Validation: [00..99]
// ---------------------------------------------------------------------------

export interface IoqmIntegerValidationResult {
  readonly isValid: boolean;
  readonly normalizedValue?: number;
  readonly formattedTwoDigit?: string;
  readonly error?: string;
}

/**
 * Validates whether an entered answer strictly conforms to official IOQM integer requirements:
 * Must be a non-negative integer between 0 and 99 (inclusive).
 * Leading zeros allowed (e.g. "07" -> 7). Decimals, negatives, and out-of-range values rejected.
 */
export function validateIoqmInteger(input: unknown): IoqmIntegerValidationResult {
  if (input === null || input === undefined || input === '') {
    return { isValid: false, error: 'Empty answer. Enter an integer between 00 and 99.' };
  }

  const str = String(input).trim();
  // Must only contain digits, maximum 2 digits (or leading zero formatted)
  if (!/^\d{1,2}$/.test(str)) {
    return {
      isValid: false,
      error: 'Invalid format. IOQM answers must be 1- or 2-digit non-negative integers (00 to 99).',
    };
  }

  const num = parseInt(str, 10);
  if (!Number.isInteger(num) || num < 0 || num > 99) {
    return {
      isValid: false,
      error: `Value out of range (${num}). Must be between 00 and 99.`,
    };
  }

  const formattedTwoDigit = num.toString().padStart(2, '0');
  return {
    isValid: true,
    normalizedValue: num,
    formattedTwoDigit,
  };
}

// ---------------------------------------------------------------------------
// 2. IOQM Challenge Paper A 30-Part Configuration
// ---------------------------------------------------------------------------

const SHARED_GEOMETRY_STIMULUS: SharedStimulus = {
  id: 'stim-ioqm-geom',
  title: 'Cyclic Quadrilateral and Orthic Invariants',
  contentHtml: `
    <p>Let $\\triangle ABC$ be an acute triangle with circumcircle $\\Omega$ and orthocenter $H$.
    Points $D, E, F$ are the feet of the altitudes from $A, B, C$ onto sides $BC, CA, AB$ respectively.
    The line $EF$ intersects $\\Omega$ at points $P$ and $Q$.
    Let $M$ be the midpoint of side $BC$.</p>
  `,
};

function createIoqmQuestionParts(): PaperQuestionPart[] {
  const parts: PaperQuestionPart[] = [];

  // Section A: Questions 1 to 10 (2 Marks each)
  const secAPrompts = [
    'Find the number of pairs of positive integers $(a, b)$ such that $\\gcd(a, b) = 1$ and $a + b = 24$.',
    'Evaluate the units digit of $7^{2024} + 3^{2024}$.',
    'A polynomial $P(x) = x^2 - 14x + k$ has two prime roots. Find the value of $k$.',
    'In $\\triangle ABC$, $\\angle A = 60^\\circ$ and $AB = AC = 8$. Find the inradius $r$.',
    'Find the number of two-digit numbers whose digits sum to a prime number.',
    'Let $x, y$ be real numbers such that $x^2 + y^2 = 25$ and $xy = 12$. Find the value of $(x + y)^2$.',
    'How many integer solutions $(x, y)$ satisfy $xy = x + y + 7$?',
    'In a circle of radius 10, a chord has length 12. Find the distance from the center to the chord.',
    'Find the remainder when $2^{100}$ is divided by 7.',
    'Evaluate the maximum possible value of $x(10 - x)$ for real $x$.',
  ];

  for (let i = 1; i <= 10; i++) {
    parts.push({
      id: `p-ioqm-${i.toString().padStart(2, '0')}`,
      partKey: `${i}`,
      sectionId: 'sec-a',
      label: `Question ${i} (Algebra & Number Theory)`,
      maxPoints: 2,
      archetypeId: 'MATH_E1',
      responseKind: 'INTEGER',
      promptHtml: `<p>${secAPrompts[i - 1]}</p>`,
    });
  }

  // Section B: Questions 11 to 20 (3 Marks each)
  const secBPrompts = [
    'Find the number of positive integers $n \\le 100$ such that $n^2 + 1$ is divisible by 5.',
    'Let $P(x)$ be a cubic polynomial such that $P(1) = 2, P(2) = 4, P(3) = 8, P(4) = 16$. Find $P(5) \\pmod{100}$.',
    'In $\\triangle ABC$, the medians from $B$ and $C$ are perpendicular. If $AB = 19$ and $AC = 22$, find $BC$.',
    'Find the number of ordered triples of non-negative integers $(a, b, c)$ such that $a + b + c = 12$.',
    'Let $S$ be the set of all roots of $(x^2 - 7x + 11)^{x^2 - 13x + 42} = 1$. Find the sum of all elements in $S$.',
    'Points $A, B, C, D$ lie on a circle in that order with $AB = 6, BC = 8, CD = 6, DA = 8$. Find the diameter of the circle.',
    'How many 3-digit numbers have the property that their digits are in strictly increasing order?',
    'Find the smallest positive integer $n$ such that $n!$ ends in exactly 12 zeros.',
    'In the cyclic quadrilateral of the stimulus, if $\\angle BAC = 50^\\circ$, find $\\angle BHC$ in degrees.',
    'Let $x + \\frac{1}{x} = 3$. Find the value of $x^4 + \\frac{1}{x^4}$.',
  ];

  for (let i = 11; i <= 20; i++) {
    parts.push({
      id: `p-ioqm-${i}`,
      partKey: `${i}`,
      sectionId: 'sec-b',
      label: `Question ${i} (Geometry & Combinatorics)`,
      maxPoints: 3,
      archetypeId: 'MATH_E1',
      responseKind: 'INTEGER',
      sharedStimulusId: i === 19 ? 'stim-ioqm-geom' : undefined,
      promptHtml: `<p>${secBPrompts[i - 11]}</p>`,
    });
  }

  // Section C: Questions 21 to 30 (5 Marks each)
  const secCPrompts = [
    'Find the number of subsets of $\\{1, 2, \\dots, 10\\}$ that do not contain two consecutive integers.',
    'Let $a, b, c$ be roots of $x^3 - 9x^2 + 24x - 17 = 0$. Find the value of $(a - 2)(b - 2)(c - 2)$.',
    'In cyclic quadrilateral $ABCD$, $AC \\perp BD$. If $AB = 7, BC = 15, CD = 20$, find $DA$.',
    'Find the largest two-digit prime that divides $\\binom{100}{50}$.',
    'A sequence is defined by $a_1 = 1, a_2 = 3$ and $a_{n+2} = 3a_{n+1} - a_n$. Find $a_7 \\pmod{100}$.',
    'In $\\triangle ABC$, the excircle opposite to $A$ touches $BC$ at $X$. If $AB = 13, BC = 14, CA = 15$, find $BX$.',
    'Find the number of positive integers $n < 100$ such that $\\phi(n)$ is odd, where $\\phi$ is Euler’s totient function.',
    'Let $f(x) = x^4 + ax^3 + bx^2 + cx + d$ have integer coefficients. If $f(1) = f(2) = f(3) = 10$, find the minimum possible value of $f(4)$.',
    'In the stimulus, if circumradius $R = 25$ and distance $OM = 15$, evaluate the length of altitude foot segment $EF$.',
    'Find the number of positive divisors of $2024^{2024}$ that are perfect squares, modulo 100.',
  ];

  for (let i = 21; i <= 30; i++) {
    parts.push({
      id: `p-ioqm-${i}`,
      partKey: `${i}`,
      sectionId: 'sec-c',
      label: `Question ${i} (Advanced Olympiad Problem)`,
      maxPoints: 5,
      archetypeId: 'MATH_E1',
      responseKind: 'INTEGER',
      sharedStimulusId: i === 29 ? 'stim-ioqm-geom' : undefined,
      promptHtml: `<p>${secCPrompts[i - 21]}</p>`,
    });
  }

  return parts;
}

export function createIoqmPaperWorkspaceConfig(): PaperWorkspaceConfig {
  const parts = createIoqmQuestionParts();
  return {
    paperId: 'paper:ioqm-challenge-a',
    paperTitle: 'IOQM 3-Hour Challenge Paper A (Authored Mock — 2024 HBCSE Structure)',
    durationSeconds: 180 * 60, // 180 minutes = 10,800 seconds
    sections: [
      {
        id: 'sec-a',
        title: 'Section A: Questions 1–10 (2 Marks Each)',
        partIds: parts.slice(0, 10).map((p) => p.id),
        instructions: 'Each question carries 2 marks. Answers are integers from 00 to 99.',
      },
      {
        id: 'sec-b',
        title: 'Section B: Questions 11–20 (3 Marks Each)',
        partIds: parts.slice(10, 20).map((p) => p.id),
        instructions: 'Each question carries 3 marks. Answers are integers from 00 to 99.',
      },
      {
        id: 'sec-c',
        title: 'Section C: Questions 21–30 (5 Marks Each)',
        partIds: parts.slice(20, 30).map((p) => p.id),
        instructions: 'Each question carries 5 marks. Answers are integers from 00 to 99.',
      },
    ],
    parts,
    stimuli: [SHARED_GEOMETRY_STIMULUS],
    allowedAids: ['SCRATCHPAD'], // STRICT HBCSE rule: No calculators
  };
}

// ---------------------------------------------------------------------------
// 3. Authority Factory: createAuthorizedIoqmPaperSession
// ---------------------------------------------------------------------------

export async function createAuthorizedIoqmPaperSession(
  learnerId: string = 'diagnostic_learner',
  customDriver?: StorageDriver,
  forceNewAttempt: boolean = false
): Promise<{ config: PaperWorkspaceConfig; binding: PaperBinding }> {
  const config = createIoqmPaperWorkspaceConfig();
  const definitionSha256 = await paperDefinitionDigest(config);

  const paper: Ref<'PAPER'> = {
    type: 'PAPER',
    id: config.paperId,
    revision: 1,
    sha256: definitionSha256,
  };

  const task: TaskRef = {
    type: 'QUESTION',
    id: 'task:ioqm-challenge-a',
    revision: 1,
    sha256: await computeSha256(canonicalJson({ id: 'task:ioqm-challenge-a', parts: config.parts.map((p) => p.id) })),
  };

  const assessment: Ref<'ASSESSMENT'> = {
    type: 'ASSESSMENT',
    id: 'asm:ioqm-challenge-a',
    revision: 1,
    sha256: '0'.repeat(64), // Sealed diagnostic assessment
  };

  // Construct multipart contract for StandardAssessmentEngine
  const contractParts: Record<string, AssessmentContract> = {};
  for (const p of config.parts) {
    contractParts[p.id] = {
      id: p.id,
      task_ref: task,
      response_kind: 'INTEGER',
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
    max_points: 100,
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

  const driver = customDriver || createStorageDriver({ dbName: 'grade9_ioqm_runtime' });

  const releaseId = 'rel-ioqm-2024-v1';
  const {session:ses,attemptId} = await acquireAuthorizedPaperRun({
    driver,legacySessionId:`ses:${releaseId}:${config.paperId}:${learnerId}`,
    releaseId,paper,task,durationSeconds:config.durationSeconds,
    returnRoute:'/competitive/exam:ioqm',forceNewAttempt,
  });

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
