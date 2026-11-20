import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { Core1OrientationPageController } from '../../web/pages/orientation.ts';
import { Core1ALessonPageController, createDefaultLesson } from '../../web/pages/lesson.ts';
import { Core1BTransferPageController, createDefaultTransferDefinition } from '../../web/pages/transfer.ts';
import { Core2ASupportedPageController, createDefaultSupportedProblem } from '../../web/pages/supported-practice.ts';
import { Core2BTransferPageController, createDefaultChangedDemandTask } from '../../web/pages/transfer-changed-demand.ts';
import { QuestionPageController } from '../../web/pages/question.ts';
import { GcdrExplorerPageController } from '../../web/pages/explorer.ts';

describe('Gate P5-G1: Native Blueprint Fidelity & Slot Verification', () => {
  const mapPath = path.resolve(process.cwd(), 'docs/architecture/native-blueprint-map.json');
  const mapData = JSON.parse(fs.readFileSync(mapPath, 'utf8'));

  const expectedBlueprints: Record<string, { id: string; mode: string; slots: string[] }> = {
    CORE1: {
      id: 'BP-CORE1-ORIENTATION@1.1.0',
      mode: 'READING_ORIENTATION',
      slots: ['identity', 'orientation'],
    },
    CORE1A: {
      id: 'BP-CORE1A-CONSTRUCTION@1.8.0',
      mode: 'READING_CONSTRUCTION',
      slots: ['identity', 'construction', 'repair_closure'],
    },
    CORE1B: {
      id: 'BP-CORE1B-RECONSTRUCTION@1.1.0',
      mode: 'GUIDED_RECONSTRUCTION',
      slots: ['identity', 'attempt', 'reconstruction'],
    },
    CORE2: {
      id: 'BP-CORE2-SOURCE-QUESTION@1.11.0',
      mode: 'QUESTION_READER',
      slots: ['identity', 'attempt', 'representation', 'support', 'solution'],
    },
    CORE2A: {
      id: 'BP-CORE2A-SUPPORTED-APPLICATION@1.1.0',
      mode: 'QUESTION_STUDY',
      slots: ['identity', 'attempt', 'support', 'reasoning'],
    },
    CORE2B: {
      id: 'BP-CORE2B-TRANSFER@1.1.0',
      mode: 'TRANSFER_ATTEMPT',
      slots: ['identity', 'attempt', 'post_attempt'],
    },
    EXPLORER: {
      id: 'BP-EXPLORER-GCDR@1.0.0',
      mode: 'STAGE_SUPPORT',
      slots: ['identity', 'stage', 'route'],
    },
  };

  it('verifies all seven blueprints match native blueprint map definitions exactly', () => {
    assert.equal(mapData.blueprints.length, 7);
    for (const bp of mapData.blueprints) {
      const exp = expectedBlueprints[bp.target_role];
      assert(exp, `Unexpected role ${bp.target_role}`);
      assert.equal(bp.blueprint_id, exp.id);
      assert.equal(bp.layout_mode, exp.mode);
      const actualSlots = bp.native_slots.map((s: any) => s.id);
      assert.deepEqual(actualSlots, exp.slots, `Slot mismatch for ${bp.target_role}`);
    }
  });

  it('verifies CORE1 Orientation 2 slots and 7 accepted blocks under orientation slot', () => {
    const core1Bp = mapData.blueprints.find((b: any) => b.target_role === 'CORE1');
    assert(core1Bp);
    assert.equal(core1Bp.native_slots.length, 2);
    assert.deepEqual(core1Bp.native_slots[0].accepts_blocks, ['identity_scope', 'learner_metadata']);
    assert.deepEqual(core1Bp.native_slots[1].accepts_blocks, [
      'objects_conventions',
      'canonical_representation',
      'governing_relations',
      'compact_anchor',
      'hard_transition_map',
      'exclusions_extensions',
      'orientation_closure',
    ]);
  });

  it('verifies rendered DOM slots of each page controller match their native blueprint slots', () => {
    const extractSlots = (html: string) => {
      const matches = html.matchAll(/data-slot="([^"]+)"/g);
      return Array.from(new Set(Array.from(matches, m => m[1])));
    };

    // 1. Core 1
    const c1 = new Core1OrientationPageController();
    assert.deepEqual(extractSlots(c1.render()), ['identity', 'orientation']);

    // 2. Core 1A
    const c1a = new Core1ALessonPageController({ lessonDefinition: createDefaultLesson() });
    assert.deepEqual(extractSlots(c1a.render()), ['identity', 'construction', 'repair_closure']);

    // 3. Core 2A
    const c2a = new Core2ASupportedPageController({ problem: createDefaultSupportedProblem() });
    assert.deepEqual(extractSlots(c2a.render()), ['identity', 'attempt', 'support', 'reasoning']);

    // 4. Core 2B
    const c2b = new Core2BTransferPageController({ taskDefinition: createDefaultChangedDemandTask() });
    assert.deepEqual(extractSlots(c2b.render()), ['identity', 'attempt', 'post_attempt']);

    // 5. Explorer
    const exp = new GcdrExplorerPageController({
      explorerId: 'wpe-01',
      title: 'Explorer Test',
      subject: 'Physics',
      topic: 'WPE',
      helpers: { exactnessBadge: { fidelity: 'NUMERICAL_EXACT', binding: 'CANONICAL_BINDING', academicClaimDisclaimer: 'HOLD' } },
    });
    assert.deepEqual(extractSlots(exp.renderHtml()), ['identity', 'stage', 'route']);
  });
});
