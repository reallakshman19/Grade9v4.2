/**
 * tests/parity/legacy_pilot_harness.spec.ts
 * A69 — Parity test harness for the Three Legacy Functional-Parity Pilots.
 *
 * Verifies:
 * - Summary report docs/evidence/legacy-pilot-summary.json schema and completeness
 * - Preservation of custody refs and legacy source paths
 * - Data field conservation across all 3 pilots (Motion in Plane, Redox Adaptive, Circles Master)
 * - Strict Rule 13 invariant and fail-closed parity disposition:
 *   "No academic approval inferred from software validation."
 *   "No claim synthetic = legacy parity."
 *   academic_admission: HOLD, release_authority: NONE
 *
 * No academic approval inferred from software validation.
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

describe('A69 Legacy Functional-Parity Pilot Harness', () => {
  const summaryPath = join(process.cwd(), 'docs/evidence/legacy-pilot-summary.json');

  it('verifies docs/evidence/legacy-pilot-summary.json exists and adheres to schema', () => {
    assert.ok(existsSync(summaryPath), 'docs/evidence/legacy-pilot-summary.json must exist');

    const content = JSON.parse(readFileSync(summaryPath, 'utf8'));
    assert.equal(content.workpack_id, 'A69');
    assert.equal(content.academic_admission, 'HOLD');
    assert.equal(content.release_authority, 'NONE');
    assert.equal(content.real_legacy_parity_status, 'BLOCKED_PENDING_EXPLICIT_AUTHORIZATION');
    assert.equal(content.synthetic_analogue_parity, 'VERIFIED_TECHNICAL_HARNESS_ONLY');
    assert.ok(content.disclaimer.includes('No academic approval inferred from software validation'));
    assert.ok(content.disclaimer.includes('No claim synthetic = legacy parity'));

    assert.equal(content.pilots.length, 3);
  });

  it('validates enumeration and custody path preservation for all three pilots', () => {
    const content = JSON.parse(readFileSync(summaryPath, 'utf8'));
    const expectedPilots = [
      {
        id: 'PILOT-PHYS-MOTION-IN-PLANE',
        subject: 'PHYSICS',
        topic: 'PHYS-TOPIC-MOTION-2D',
      },
      {
        id: 'PILOT-CHEM-REDOX-ADAPTIVE',
        subject: 'CHEMISTRY',
        topic: 'CHEM-TOPIC-REDOX',
      },
      {
        id: 'PILOT-MATH-CIRCLES-MASTER',
        subject: 'MATHEMATICS',
        topic: 'MATH-TOPIC-CIRCLES-GEOMETRY',
      },
    ];

    for (const exp of expectedPilots) {
      const p = content.pilots.find((x: { pilot_id: string }) => x.pilot_id === exp.id);
      assert.ok(p, `Pilot ${exp.id} not found in summary`);
      assert.equal(p.subject, exp.subject);
      assert.equal(p.topic, exp.topic);
      assert.ok(p.legacy_source_path.length > 0);
      assert.ok(p.custody_ref.length > 0);
      assert.equal(p.parity_verification.data_field_conservation, 'CONSERVED_EXACT');
      assert.equal(p.parity_verification.synthetic_vs_legacy_disposition, 'SYNTHETIC_ANALOGUE_PASS_REAL_PARITY_HOLD');
    }
  });

  it('validates tablet touch constraints (>= 48px) and 0px horizontal overflow across all pilots', () => {
    const content = JSON.parse(readFileSync(summaryPath, 'utf8'));

    for (const p of content.pilots) {
      assert.equal(p.tablet_layout.min_touch_target_px, 48);
      assert.equal(p.tablet_layout.max_horizontal_overflow_px, 0);
      assert.equal(p.tablet_layout.landscape, 'SPLIT_66_34');
      assert.equal(p.tablet_layout.portrait, 'VERTICAL_STACKED');

      for (const [controlKey, control] of Object.entries(p.controls as Record<string, { min_hit_target_px: number }>)) {
        assert.ok(
          control.min_hit_target_px >= 48,
          `Pilot ${p.pilot_id} control ${controlKey} must have >= 48px hit target`,
        );
      }
    }
  });
});

