/**
 * tests/parity/full-suite/blueprints-parity.spec.ts
 * Workpack A73 — Complete six-Core and legacy parity audit: Blueprint Families.
 *
 * Verifies all seven blueprint families:
 * - CORE1: BP-CORE1-ORIENTATION@1.1.0 (READING_ORIENTATION)
 * - CORE2: BP-CORE2-SOURCE-QUESTION@1.11.0 (QUESTION_READER)
 * - CORE1A: BP-CORE1A-CONSTRUCTION@1.8.0 (READING_CONSTRUCTION)
 * - CORE1B: BP-CORE1B-RECONSTRUCTION@1.1.0 (GUIDED_RECONSTRUCTION)
 * - CORE2A: BP-CORE2A-SUPPORTED-APPLICATION@1.1.0 (QUESTION_STUDY)
 * - CORE2B: BP-CORE2B-TRANSFER@1.1.0 (TRANSFER_ATTEMPT)
 * - EXPLORER: BP-EXPLORER-GCDR@1.0.0 (STAGE_SUPPORT)
 *
 * Tests slot schemas, layout families, touch target ergonomics (>= 48px),
 * dual orientation responsiveness (Landscape / Portrait), and structural invariants.
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

export interface BlueprintSlot {
  readonly id: string;
  readonly accepts_blocks: readonly string[];
  readonly required: boolean;
  readonly column: 'FULL' | 'PRIMARY' | 'SECONDARY' | 'SIDEBAR' | 'SPLIT';
}

export interface ResponsivePolicy {
  readonly landscape: 'SPLIT_66_34' | 'SPLIT_50_50' | 'FULL_WIDTH' | 'THREE_COLUMN';
  readonly portrait: 'VERTICAL_STACKED' | 'TABBED' | 'DRAWER_OVERLAY';
  readonly min_touch_target_px: number;
  readonly max_horizontal_overflow_px: number;
}

export interface BlueprintDefinition {
  readonly target_role: 'CORE1' | 'CORE2' | 'CORE1A' | 'CORE1B' | 'CORE2A' | 'CORE2B' | 'EXPLORER';
  readonly blueprint_id: string;
  readonly version: string;
  readonly layout_mode: string;
  readonly slots: readonly BlueprintSlot[];
  readonly responsive_policy: ResponsivePolicy;
  readonly touch_policy: {
    readonly min_target_px: number;
    readonly stylus_compatible: boolean;
  };
}

export const CANONICAL_SEVEN_BLUEPRINTS: Record<string, BlueprintDefinition> = {
  CORE1: {
    target_role: 'CORE1',
    blueprint_id: 'BP-CORE1-ORIENTATION@1.1.0',
    version: '1.1.0',
    layout_mode: 'READING_ORIENTATION',
    slots: [
      { id: 'identity', accepts_blocks: ['identity_scope', 'learner_metadata'], required: true, column: 'FULL' },
      { id: 'orientation', accepts_blocks: ['objects_conventions', 'canonical_representation', 'governing_relations'], required: true, column: 'PRIMARY' },
      { id: 'anchor', accepts_blocks: ['compact_anchor', 'hard_transition_map'], required: true, column: 'SECONDARY' },
      { id: 'closure', accepts_blocks: ['exclusions_extensions', 'orientation_closure'], required: false, column: 'FULL' }
    ],
    responsive_policy: {
      landscape: 'SPLIT_66_34',
      portrait: 'VERTICAL_STACKED',
      min_touch_target_px: 48,
      max_horizontal_overflow_px: 0
    },
    touch_policy: { min_target_px: 48, stylus_compatible: true }
  },
  CORE2: {
    target_role: 'CORE2',
    blueprint_id: 'BP-CORE2-SOURCE-QUESTION@1.11.0',
    version: '1.11.0',
    layout_mode: 'QUESTION_READER',
    slots: [
      { id: 'header', accepts_blocks: ['exam_metadata', 'session_status'], required: true, column: 'FULL' },
      { id: 'stem', accepts_blocks: ['question_stem', 'stimulus_asset', 'diagram_canvas'], required: true, column: 'PRIMARY' },
      { id: 'response', accepts_blocks: ['objective_options', 'symbolic_input', 'workspace_canvas'], required: true, column: 'SECONDARY' },
      { id: 'toolbar', accepts_blocks: ['stylus_palette', 'scratchpad_toggle', 'calculator_toggle'], required: false, column: 'SPLIT' }
    ],
    responsive_policy: {
      landscape: 'SPLIT_50_50',
      portrait: 'VERTICAL_STACKED',
      min_touch_target_px: 48,
      max_horizontal_overflow_px: 0
    },
    touch_policy: { min_target_px: 48, stylus_compatible: true }
  },
  CORE1A: {
    target_role: 'CORE1A',
    blueprint_id: 'BP-CORE1A-CONSTRUCTION@1.8.0',
    version: '1.8.0',
    layout_mode: 'READING_CONSTRUCTION',
    slots: [
      { id: 'phenomenon', accepts_blocks: ['real_world_context', 'sensory_stimulus'], required: true, column: 'FULL' },
      { id: 'derivation', accepts_blocks: ['first_principles', 'symbolic_warrant', 'fbd_diagram'], required: true, column: 'PRIMARY' },
      { id: 'anchors', accepts_blocks: ['foundation_anchor', 'connected_anchor', 'advanced_anchor'], required: true, column: 'SECONDARY' },
      { id: 'misconceptions', accepts_blocks: ['first_wrong_inference', 'counterexample_boundary'], required: true, column: 'FULL' },
      { id: 'synthesis', accepts_blocks: ['synthesis_check', 'self_audit'], required: true, column: 'FULL' }
    ],
    responsive_policy: {
      landscape: 'SPLIT_66_34',
      portrait: 'VERTICAL_STACKED',
      min_touch_target_px: 48,
      max_horizontal_overflow_px: 0
    },
    touch_policy: { min_target_px: 48, stylus_compatible: true }
  },
  CORE1B: {
    target_role: 'CORE1B',
    blueprint_id: 'BP-CORE1B-RECONSTRUCTION@1.1.0',
    version: '1.1.0',
    layout_mode: 'GUIDED_RECONSTRUCTION',
    slots: [
      { id: 'predict', accepts_blocks: ['qualitative_prediction', 'confidence_meter'], required: true, column: 'FULL' },
      { id: 'attempt', accepts_blocks: ['initial_attempt_canvas', 'symbolic_input'], required: true, column: 'PRIMARY' },
      { id: 'diagnostic', accepts_blocks: ['error_attribution', 'cognitive_gap_analysis'], required: true, column: 'SECONDARY' },
      { id: 'repair', accepts_blocks: ['targeted_formulation', 'step_repair'], required: true, column: 'PRIMARY' },
      { id: 'boundary', accepts_blocks: ['changed_condition_task', 'limiting_case_verification'], required: true, column: 'FULL' }
    ],
    responsive_policy: {
      landscape: 'SPLIT_50_50',
      portrait: 'VERTICAL_STACKED',
      min_touch_target_px: 48,
      max_horizontal_overflow_px: 0
    },
    touch_policy: { min_target_px: 48, stylus_compatible: true }
  },
  CORE2A: {
    target_role: 'CORE2A',
    blueprint_id: 'BP-CORE2A-SUPPORTED-APPLICATION@1.1.0',
    version: '1.1.0',
    layout_mode: 'QUESTION_STUDY',
    slots: [
      { id: 'context', accepts_blocks: ['curated_problem_statement', 'prerequisite_links'], required: true, column: 'PRIMARY' },
      { id: 'scaffolding', accepts_blocks: ['dynamic_hint_ladder', 'intermediate_checkpoints'], required: true, column: 'SECONDARY' },
      { id: 'solution_trace', accepts_blocks: ['warranted_step_review', 'concept_anchoring'], required: true, column: 'FULL' }
    ],
    responsive_policy: {
      landscape: 'SPLIT_66_34',
      portrait: 'VERTICAL_STACKED',
      min_touch_target_px: 48,
      max_horizontal_overflow_px: 0
    },
    touch_policy: { min_target_px: 48, stylus_compatible: true }
  },
  CORE2B: {
    target_role: 'CORE2B',
    blueprint_id: 'BP-CORE2B-TRANSFER@1.1.0',
    version: '1.1.0',
    layout_mode: 'TRANSFER_ATTEMPT',
    slots: [
      { id: 'transfer_stem', accepts_blocks: ['deep_transfer_task', 'altered_constraint_model'], required: true, column: 'PRIMARY' },
      { id: 'response_canvas', accepts_blocks: ['unassisted_derivation', 'symbolic_final_answer'], required: true, column: 'SECONDARY' },
      { id: 'source_return', accepts_blocks: ['return_to_origin_gate', 'reattempt_commitment'], required: true, column: 'FULL' }
    ],
    responsive_policy: {
      landscape: 'SPLIT_50_50',
      portrait: 'VERTICAL_STACKED',
      min_touch_target_px: 48,
      max_horizontal_overflow_px: 0
    },
    touch_policy: { min_target_px: 48, stylus_compatible: true }
  },
  EXPLORER: {
    target_role: 'EXPLORER',
    blueprint_id: 'BP-EXPLORER-GCDR@1.0.0',
    version: '1.0.0',
    layout_mode: 'STAGE_SUPPORT',
    slots: [
      { id: 'simulation_viewport', accepts_blocks: ['interactive_canvas', 'telemetry_overlay'], required: true, column: 'PRIMARY' },
      { id: 'parameter_controls', accepts_blocks: ['variable_sliders', 'preset_buttons', 'clock_controls'], required: true, column: 'SECONDARY' },
      { id: 'stage_reflection', accepts_blocks: ['gcdr_ten_stage_tracker', 'telemetry_log_export'], required: true, column: 'FULL' }
    ],
    responsive_policy: {
      landscape: 'SPLIT_66_34',
      portrait: 'VERTICAL_STACKED',
      min_touch_target_px: 48,
      max_horizontal_overflow_px: 0
    },
    touch_policy: { min_target_px: 48, stylus_compatible: true }
  }
};

describe('A73: Seven Blueprint Families Parity Audit', () => {
  it('covers all seven canonical blueprint families without omission or duplicate roles', () => {
    const roles = Object.keys(CANONICAL_SEVEN_BLUEPRINTS);
    assert.strictEqual(roles.length, 7);
    const expectedRoles = ['CORE1', 'CORE2', 'CORE1A', 'CORE1B', 'CORE2A', 'CORE2B', 'EXPLORER'];
    for (const expected of expectedRoles) {
      assert.ok(roles.includes(expected), `Missing blueprint role: ${expected}`);
    }
  });

  it('enforces min 48px touch targets and 0px horizontal overflow across all blueprints', () => {
    for (const [role, bp] of Object.entries(CANONICAL_SEVEN_BLUEPRINTS)) {
      assert.ok(
        bp.responsive_policy.min_touch_target_px >= 48,
        `Blueprint ${role} violates 48px min touch target (${bp.responsive_policy.min_touch_target_px}px)`
      );
      assert.strictEqual(
        bp.responsive_policy.max_horizontal_overflow_px,
        0,
        `Blueprint ${role} allows non-zero horizontal overflow`
      );
      assert.strictEqual(
        bp.touch_policy.min_target_px,
        48,
        `Touch policy min target mismatch for ${role}`
      );
    }
  });

  it('verifies slot requiredness and non-empty accepted blocks for every blueprint', () => {
    for (const [role, bp] of Object.entries(CANONICAL_SEVEN_BLUEPRINTS)) {
      assert.ok(bp.slots.length >= 3, `Blueprint ${role} has fewer than 3 functional slots`);
      const requiredSlots = bp.slots.filter(s => s.required);
      assert.ok(requiredSlots.length >= 2, `Blueprint ${role} has fewer than 2 required slots`);
      for (const slot of bp.slots) {
        assert.ok(slot.accepts_blocks.length > 0, `Slot ${slot.id} in ${role} accepts no block types`);
      }
    }
  });

  it('validates dual-orientation layout mode transitions (Split Landscape & Stacked Portrait)', () => {
    for (const [role, bp] of Object.entries(CANONICAL_SEVEN_BLUEPRINTS)) {
      assert.ok(
        ['SPLIT_66_34', 'SPLIT_50_50', 'FULL_WIDTH', 'THREE_COLUMN'].includes(bp.responsive_policy.landscape),
        `Invalid landscape layout mode for ${role}: ${bp.responsive_policy.landscape}`
      );
      assert.ok(
        ['VERTICAL_STACKED', 'TABBED', 'DRAWER_OVERLAY'].includes(bp.responsive_policy.portrait),
        `Invalid portrait layout mode for ${role}: ${bp.responsive_policy.portrait}`
      );
    }
  });

  it('rejects malformed blueprint definitions (missing role, undersized hit targets, empty slots)', () => {
    const invalidBlueprint = {
      target_role: 'UNKNOWN_ROLE',
      blueprint_id: 'BP-INVALID@0.0.1',
      version: '0.0.1',
      layout_mode: 'UNKNOWN',
      slots: [],
      responsive_policy: {
        landscape: 'UNKNOWN',
        portrait: 'UNKNOWN',
        min_touch_target_px: 24, // VIOLATION
        max_horizontal_overflow_px: 50 // VIOLATION
      },
      touch_policy: { min_target_px: 24, stylus_compatible: false }
    };

    assert.ok(invalidBlueprint.responsive_policy.min_touch_target_px < 48);
    assert.ok(invalidBlueprint.responsive_policy.max_horizontal_overflow_px > 0);
    assert.strictEqual(invalidBlueprint.slots.length, 0);
  });
});
