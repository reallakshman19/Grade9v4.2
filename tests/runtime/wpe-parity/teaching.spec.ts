/**
 * tests/runtime/wpe-parity/teaching.spec.ts
 * Workpack A54: Continuous Teaching Units A1..A9, Anchor Tiers, and QRT C06 v1.1 Suite.
 *
 * Verifies:
 * 1. Core 1A continuous teaching units A1 through A9 in strict pedagogical sequence:
 *    - A1: Phenomenon
 *    - A2: Prerequisite
 *    - A3: Mechanism
 *    - A4: Warranted Derivation
 *    - A5: Meaningful Figure
 *    - A6: Progressive Anchors (FOUNDATION / CONNECTED / ADVANCED)
 *    - A7: Misconception & First-Wrong-Inference
 *    - A8: Counterexample & Model Boundary
 *    - A9: Synthesis & Unassisted Check
 * 2. Anchor tiers: exactly FOUNDATION, CONNECTED, ADVANCED without duplicate task refs or recycled synthesis.
 * 3. QRT C06 v1.1 cell bounds: strictly 1 MAIN and >= 2 distinct INSTANCE references.
 *
 * No academic approval inferred from software validation.
 * academic_admission: HOLD
 * release_authority: NONE
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';

import {
  CORE1A_ORDERED_ROLES,
  ANCHOR_LEVELS,
} from '../../../web/journeys/core1a.ts';

import {
  canonicalJson,
} from '../../../web/runtime/loader.ts';

import type { Ref, TaskRef } from '../../../web/runtime/types.ts';

function digestRef(r: Ref): string {
  return createHash('sha256').update(canonicalJson(r)).digest('hex');
}

function makeRef<T extends Ref['type']>(type: T, id: string): Ref<T> {
  return {
    type,
    id,
    revision: 1,
    sha256: 'a'.repeat(64),
  };
}

export interface LessonStructure {
  units: Array<{ role: string; title: string }>;
  anchors: Array<{ level: string; taskRef: Ref }>;
  synthesisTaskRef: Ref;
}

export interface QrtCellStructure {
  c06_v11: boolean;
  instances: Ref[];
  main: Ref | null;
}

export function validateLessonStructure(lesson: LessonStructure): void {
  const roles = lesson.units.map((u) => u.role);
  const expectedRoles = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9'];
  if (roles.length !== expectedRoles.length || !roles.every((r, idx) => r === expectedRoles[idx])) {
    throw new Error('missing/duplicate/out-of-order unit roles in Core1A');
  }

  const levels = lesson.anchors.map((a) => a.level);
  if (levels.length !== 3 || levels[0] !== 'FOUNDATION' || levels[1] !== 'CONNECTED' || levels[2] !== 'ADVANCED') {
    throw new Error('anchor levels must strictly be [FOUNDATION, CONNECTED, ADVANCED]');
  }

  const anchorDigests = lesson.anchors.map((a) => digestRef(a.taskRef));
  if (new Set(anchorDigests).size !== 3) {
    throw new Error('duplicate anchor task reference detected');
  }

  const synthesisDigest = digestRef(lesson.synthesisTaskRef);
  if (anchorDigests.includes(synthesisDigest)) {
    throw new Error('recycled synthesis task reference cannot alias an anchor');
  }
}

export function validateQrtCell(cell: QrtCellStructure): void {
  const instanceDigests = cell.instances.map((r) => digestRef(r));
  if (new Set(instanceDigests).size !== cell.instances.length) {
    throw new Error('duplicate instance reference in QRT cell');
  }

  if (cell.c06_v11) {
    if (!cell.main || cell.instances.length < 2) {
      throw new Error('QRT C06 v1.1 requires 1 MAIN and at least 2 distinct instances');
    }
    const mainDigest = digestRef(cell.main);
    if (instanceDigests.includes(mainDigest)) {
      throw new Error('MAIN reference cannot alias an instance');
    }
  }
}

describe('A54: Core 1A Continuous Teaching Sequence A1..A9 and Anchor Tiers', () => {
  it('validates standard continuous teaching sequence with units A1..A9', () => {
    const validLesson: LessonStructure = {
      units: CORE1A_ORDERED_ROLES.map((role) => ({ role, title: `Unit ${role}` })),
      anchors: [
        { level: 'FOUNDATION', taskRef: makeRef('QUESTION', 'q:anchor:found') },
        { level: 'CONNECTED', taskRef: makeRef('QUESTION', 'q:anchor:conn') },
        { level: 'ADVANCED', taskRef: makeRef('QUESTION', 'q:anchor:adv') },
      ],
      synthesisTaskRef: makeRef('QUESTION', 'q:synthesis:01'),
    };

    assert.doesNotThrow(() => validateLessonStructure(validLesson));
  });

  it('rejects out-of-order or duplicate unit roles (e.g. swapping A1 and A2)', () => {
    const invalidLesson: LessonStructure = {
      units: [
        { role: 'A2', title: 'Unit A2' },
        { role: 'A1', title: 'Unit A1' },
        { role: 'A3', title: 'Unit A3' },
        { role: 'A4', title: 'Unit A4' },
        { role: 'A5', title: 'Unit A5' },
        { role: 'A6', title: 'Unit A6' },
        { role: 'A7', title: 'Unit A7' },
        { role: 'A8', title: 'Unit A8' },
        { role: 'A9', title: 'Unit A9' },
      ],
      anchors: [
        { level: 'FOUNDATION', taskRef: makeRef('QUESTION', 'q:anchor:found') },
        { level: 'CONNECTED', taskRef: makeRef('QUESTION', 'q:anchor:conn') },
        { level: 'ADVANCED', taskRef: makeRef('QUESTION', 'q:anchor:adv') },
      ],
      synthesisTaskRef: makeRef('QUESTION', 'q:synthesis:01'),
    };

    assert.throws(() => validateLessonStructure(invalidLesson), /missing\/duplicate\/out-of-order unit roles/);
  });

  it('rejects repeated anchor task references across FOUNDATION, CONNECTED, ADVANCED', () => {
    const duplicateAnchorLesson: LessonStructure = {
      units: CORE1A_ORDERED_ROLES.map((role) => ({ role, title: `Unit ${role}` })),
      anchors: [
        { level: 'FOUNDATION', taskRef: makeRef('QUESTION', 'q:anchor:shared') },
        { level: 'CONNECTED', taskRef: makeRef('QUESTION', 'q:anchor:shared') }, // Duplicate
        { level: 'ADVANCED', taskRef: makeRef('QUESTION', 'q:anchor:adv') },
      ],
      synthesisTaskRef: makeRef('QUESTION', 'q:synthesis:01'),
    };

    assert.throws(() => validateLessonStructure(duplicateAnchorLesson), /duplicate anchor task reference/);
  });

  it('rejects recycled synthesis task aliasing an existing anchor', () => {
    const recycledSynthesisLesson: LessonStructure = {
      units: CORE1A_ORDERED_ROLES.map((role) => ({ role, title: `Unit ${role}` })),
      anchors: [
        { level: 'FOUNDATION', taskRef: makeRef('QUESTION', 'q:anchor:found') },
        { level: 'CONNECTED', taskRef: makeRef('QUESTION', 'q:anchor:conn') },
        { level: 'ADVANCED', taskRef: makeRef('QUESTION', 'q:anchor:adv') },
      ],
      synthesisTaskRef: makeRef('QUESTION', 'q:anchor:adv'), // Recycled from ADVANCED
    };

    assert.throws(() => validateLessonStructure(recycledSynthesisLesson), /recycled synthesis task reference/);
  });
});

describe('A54: QRT C06 v1.1 Cell Invariants (MAIN + 2 Instances)', () => {
  it('validates valid QRT cell with 1 MAIN and 2 distinct INSTANCES', () => {
    const cell: QrtCellStructure = {
      c06_v11: true,
      instances: [
        makeRef('CONSTRUCTION', 'inst:01'),
        makeRef('CONSTRUCTION', 'inst:02'),
      ],
      main: makeRef('CONSTRUCTION', 'main:01'),
    };

    assert.doesNotThrow(() => validateQrtCell(cell));
  });

  it('rejects QRT C06 v1.1 cell missing MAIN reference', () => {
    const cell: QrtCellStructure = {
      c06_v11: true,
      instances: [
        makeRef('CONSTRUCTION', 'inst:01'),
        makeRef('CONSTRUCTION', 'inst:02'),
      ],
      main: null,
    };

    assert.throws(() => validateQrtCell(cell), /1 MAIN and at least 2 distinct instances/);
  });

  it('rejects QRT cell with duplicate instances', () => {
    const cell: QrtCellStructure = {
      c06_v11: true,
      instances: [
        makeRef('CONSTRUCTION', 'inst:shared'),
        makeRef('CONSTRUCTION', 'inst:shared'),
      ],
      main: makeRef('CONSTRUCTION', 'main:01'),
    };

    assert.throws(() => validateQrtCell(cell), /duplicate instance reference/);
  });

  it('rejects QRT cell where MAIN aliases an instance', () => {
    const cell: QrtCellStructure = {
      c06_v11: true,
      instances: [
        makeRef('CONSTRUCTION', 'inst:01'),
        makeRef('CONSTRUCTION', 'inst:02'),
      ],
      main: makeRef('CONSTRUCTION', 'inst:01'), // Aliases instance 1
    };

    assert.throws(() => validateQrtCell(cell), /MAIN reference cannot alias an instance/);
  });
});
