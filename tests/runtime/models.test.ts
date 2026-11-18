/**
 * tests/runtime/models.test.ts
 * A50 — Scientific interactive model registry runtime unit tests.
 *
 * Verifies:
 * - Pure adapter registry registration and lookup
 * - Energy well turning points, equilibrium, conservation (U + K = 12.5 J), and domain checks
 * - Execution parity across all 13 synthetic WPE oracle vectors
 * - Policy-filtered output disclosure ("no automatic output precommit")
 * - Safe purely analytical computation without eval()
 *
 * No academic approval inferred from software validation.
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

import {
  HarmonicEnergyWellAdapter,
  calculateEnergyWell,
  ValueError,
} from '../../web/adapters/physics/models/energy-well.ts';
import {
  evaluateWpeModel,
} from '../../web/adapters/physics/models/wpe-oracles.ts';
import {
  ModelRegistry,
  getModelRegistry,
} from '../../web/runtime/models.ts';

describe('A50 Scientific Model Adapter: Harmonic Energy Well', () => {
  const adapter = new HarmonicEnergyWellAdapter();

  it('computes exact turning points at x = -0.5 and x = +0.5 where K = 0 and v = 0', () => {
    // Negative turning point
    const resNeg = adapter.evaluate({ x: -0.5 });
    assert.equal(resNeg['U'], 12.5);
    assert.equal(resNeg['K'], 0);
    assert.equal(resNeg['v'], 0);
    assert.equal(resNeg['isTurningPoint'], true);

    // Positive turning point
    const resPos = adapter.evaluate({ x: 0.5 });
    assert.equal(resPos['U'], 12.5);
    assert.equal(resPos['K'], 0);
    assert.equal(resPos['v'], 0);
    assert.equal(resPos['isTurningPoint'], true);
  });

  it('computes equilibrium state at x = 0.0 where U = 0 and v = 5.0 m/s', () => {
    const res = adapter.evaluate({ x: 0.0 });
    assert.equal(res['U'], 0);
    assert.equal(res['K'], 12.5);
    assert.equal(res['v'], 5.0);
    assert.equal(res['isTurningPoint'], false);
  });

  it('verifies mechanical energy conservation U + K = 12.5 across intermediate domain points', () => {
    for (const x of [-0.4, -0.25, -0.1, 0.1, 0.25, 0.4]) {
      const res = calculateEnergyWell(x);
      assert.ok(Math.abs(res.U + res.K - 12.5) < 1e-10);
      assert.ok(Math.abs(0.5 * res.v * res.v - res.K) < 1e-10);
    }
  });

  it('strictly rejects parameter domain violations outside [-0.5, 0.5] and non-finites', () => {
    const invalidValues = [-0.51, 0.51, 1.0, -10, NaN, Infinity, -Infinity];

    for (const badX of invalidValues) {
      assert.equal(adapter.validate({ x: badX }).isValid, false);
      assert.throws(() => adapter.evaluate({ x: badX }), ValueError);
    }
  });
});

describe('A50 Thirteen Synthetic WPE Model Oracles Parity', () => {
  it('correctly computes all 13 synthetic model families', () => {
    // Path to R4 acceptance fixtures
    const fixturePath = 'd:/CodeD/grade9-r4-kit/Grade9v4.2_Execution_Kit_R4/06-acceptance/fixtures/wpe-model-cases.json';
    if (!fs.existsSync(fixturePath)) {
      // Fallback relative path
      assert.fail(`Fixture file missing at ${fixturePath}`);
    }

    const cases = JSON.parse(fs.readFileSync(fixturePath, 'utf-8'));
    assert.equal(cases.length, 13);

    for (const c of cases) {
      const family = c.family;
      const inputs = c.inputs;
      const expected = c.expected;

      const actual = evaluateWpeModel(family, inputs);

      for (const [key, expVal] of Object.entries(expected)) {
        const actVal = actual[key];

        if (typeof expVal === 'number') {
          assert.ok(
            Math.abs(actVal - expVal) < 1e-6,
            `Model ${c.id} (${family}) key "${key}": expected ${expVal}, got ${actVal}`
          );
        } else if (Array.isArray(expVal)) {
          assert.equal(
            actVal.length,
            expVal.length,
            `Model ${c.id} (${family}) array length mismatch on "${key}"`
          );
          for (let i = 0; i < expVal.length; i++) {
            if (typeof expVal[i] === 'number') {
              assert.ok(Math.abs(actVal[i] - expVal[i]) < 1e-6);
            } else {
              assert.equal(actVal[i], expVal[i]);
            }
          }
        } else {
          assert.equal(
            actVal,
            expVal,
            `Model ${c.id} (${family}) mismatch on "${key}"`
          );
        }
      }
    }
  });
});

describe('A50 Model Registry & Policy-Filtered Disclosure', () => {
  it('registers defaults and retrieves models by ID and family', () => {
    const registry = new ModelRegistry();
    const all = registry.getAll();
    assert.ok(all.length >= 14); // 1 energy well + 13 WPE families

    const well = registry.get('PHYS-MODEL-ENERGY-WELL');
    assert.ok(well);
    assert.equal(well.family, 'POTENTIAL_WELLS');

    const ledger = registry.getByFamily('MULTIFORCE_LEDGER');
    assert.ok(ledger);
  });

  it('enforces pre-commit output masking during PREDICT and ATTEMPT stages', () => {
    const registry = getModelRegistry();

    // 1. In PREDICT stage without permission -> outputs MASKED
    const resPredict = registry.evaluateWithPolicy(
      'PHYS-MODEL-ENERGY-WELL',
      { x: 0.2 },
      'PREDICT',
      []
    );
    assert.equal(resPredict.isMasked, true);
    assert.equal(resPredict.outputs, null);
    assert.match(resPredict.reason || '', /withheld/i);

    // 2. In ATTEMPT stage without permission -> outputs MASKED
    const resAttempt = registry.evaluateWithPolicy(
      'PHYS-MODEL-ENERGY-WELL',
      { x: 0.2 },
      'ATTEMPT',
      []
    );
    assert.equal(resAttempt.isMasked, true);
    assert.equal(resAttempt.outputs, null);

    // 3. In ATTEMPT stage with MODEL_AUTO_CALCULATE capability -> outputs REVEALED
    const resAttemptAllowed = registry.evaluateWithPolicy(
      'PHYS-MODEL-ENERGY-WELL',
      { x: 0.2 },
      'ATTEMPT',
      ['MODEL_AUTO_CALCULATE']
    );
    assert.equal(resAttemptAllowed.isMasked, false);
    assert.ok(resAttemptAllowed.outputs);
    assert.equal(resAttemptAllowed.outputs['U'], 2.0);

    // 4. In RECONSTRUCT stage -> outputs REVEALED
    const resReconstruct = registry.evaluateWithPolicy(
      'PHYS-MODEL-ENERGY-WELL',
      { x: 0.2 },
      'RECONSTRUCT',
      []
    );
    assert.equal(resReconstruct.isMasked, false);
    assert.ok(resReconstruct.outputs);
  });

  it('guarantees zero eval() or dynamic code evaluation in registry and models', () => {
    const modelFiles = [
      path.resolve('web/runtime/models.ts'),
      path.resolve('web/adapters/physics/models/energy-well.ts'),
      path.resolve('web/adapters/physics/models/wpe-oracles.ts'),
    ];

    for (const f of modelFiles) {
      const content = fs.readFileSync(f, 'utf-8');
      // Strip comments before checking for executable eval calls
      const stripped = content.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '');
      assert.ok(!/\beval\s*\(/.test(stripped), `File ${f} contains forbidden eval()`);
      assert.ok(!/\bFunction\s*\(/.test(stripped), `File ${f} contains forbidden Function() constructor`);
    }
  });
});
