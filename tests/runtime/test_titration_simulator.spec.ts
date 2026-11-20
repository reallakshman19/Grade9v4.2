import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateTitrationPh,
  getIndicatorColor,
  TitrationSimulatorController,
  DEFAULT_TITRATION_CONFIG,
} from '../../web/pages/titration.ts';

describe('Gate P7-G6: Volumetric Titration Simulator Mathematical Model & Formative Drill', () => {
  it('computes exact pH across all 5 weak acid / strong base equilibrium regimes', () => {
    const cfg = DEFAULT_TITRATION_CONFIG; // CH3COOH + NaOH

    // Regime 1: Initial pure weak acid (Vb = 0 mL)
    // [H+] = sqrt(Ka * Ca) = sqrt(1.8e-5 * 0.1) = 1.3416e-3 M -> pH = 2.872
    const ph0 = calculateTitrationPh(0, cfg);
    assert.ok(Math.abs(ph0 - 2.87) < 0.03, `V=0 pH ${ph0} should be ~2.87`);

    // Regime 2: Half-equivalence buffer (Vb = 12.5 mL)
    // [A-] = [HA] -> pH = pKa = -log10(1.80e-5) = 4.745
    const phHalf = calculateTitrationPh(12.5, cfg);
    assert.ok(Math.abs(phHalf - 4.745) < 0.02, `V=12.5 pH ${phHalf} should be ~4.745`);

    // Regime 3: Near-equivalence boundary buffer (Vb = 24.8 mL)
    const phNear = calculateTitrationPh(24.8, cfg);
    assert.ok(phNear > 6.0 && phNear < 7.5, `V=24.8 pH ${phNear} should be between 6.0 and 7.5`);

    // Regime 4: Exact Stoichiometric Equivalence Point (Vb = 25.0 mL)
    // Salt hydrolysis: Csalt = 0.050 M, Kb = 5.556e-10 -> [OH-] = sqrt(Kb * Csalt) = 5.27e-6 -> pOH = 5.278 -> pH = 8.722
    const phEq = calculateTitrationPh(25.0, cfg);
    assert.ok(Math.abs(phEq - 8.72) < 0.04, `V=25.0 pH ${phEq} should be ~8.72`);

    // Regime 5: Post-equivalence excess base (Vb = 30.0 mL)
    // Excess NaOH = 0.50 mmol / 55 mL = 9.091e-3 M -> pOH = 2.041 -> pH = 11.959
    const phExcess = calculateTitrationPh(30.0, cfg);
    assert.ok(Math.abs(phExcess - 11.96) < 0.04, `V=30.0 pH ${phExcess} should be ~11.96`);
  });

  it('computes exact pH for strong acid / strong base (HCl + NaOH)', () => {
    const cfg = { ...DEFAULT_TITRATION_CONFIG, mode: 'STRONG_STRONG' as const };

    // Initial 0.100 M HCl -> pH = 1.00
    const ph0 = calculateTitrationPh(0, cfg);
    assert.ok(Math.abs(ph0 - 1.00) < 0.02, `Strong acid initial pH ${ph0} should be 1.00`);

    // Equivalence point -> neutral pH = 7.00
    const phEq = calculateTitrationPh(25.0, cfg);
    assert.equal(phEq, 7.00);

    // Excess strong base (Vb = 30.0 mL) -> pH = 11.96
    const phExcess = calculateTitrationPh(30.0, cfg);
    assert.ok(Math.abs(phExcess - 11.96) < 0.04, `Excess base pH ${phExcess} should be ~11.96`);
  });

  it('determines accurate indicator visual colors across transition intervals', () => {
    // Phenolphthalein: transition range 8.2 - 10.0
    const p1 = getIndicatorColor(7.0, 'PHENOLPHTHALEIN');
    assert.equal(p1.label, 'Colorless');

    const p2 = getIndicatorColor(9.0, 'PHENOLPHTHALEIN');
    assert.equal(p2.label, 'Pale Pink');

    const p3 = getIndicatorColor(12.0, 'PHENOLPHTHALEIN');
    assert.equal(p3.label, 'Vivid Magenta');

    // Methyl Orange: transition range 3.1 - 4.4
    const m1 = getIndicatorColor(2.5, 'METHYL_ORANGE');
    assert.equal(m1.label, 'Red');

    const m2 = getIndicatorColor(3.8, 'METHYL_ORANGE');
    assert.equal(m2.label, 'Orange');

    const m3 = getIndicatorColor(6.0, 'METHYL_ORANGE');
    assert.equal(m3.label, 'Yellow');
  });

  it('manages titration simulator state, burette dispensing, and tabular volume log', () => {
    const ctrl = new TitrationSimulatorController();
    assert.equal(ctrl.getCurrentVolumeAdded(), 0);
    assert.equal(ctrl.getLog().length, 1); // Step 0 recorded on init

    // Dispense 10 mL
    ctrl.dispense(10.0);
    assert.equal(ctrl.getCurrentVolumeAdded(), 10.0);
    assert.equal(ctrl.getLog().length, 2);
    assert.equal(ctrl.getLog()[1]!.volumeAddedMl, 10.0);
    assert.ok(ctrl.getCurrentPh() > 2.87);

    // Dispense another 15 mL (hits equivalence)
    ctrl.dispense(15.0);
    assert.equal(ctrl.getCurrentVolumeAdded(), 25.0);
    assert.ok(Math.abs(ctrl.getCurrentPh() - 8.72) < 0.05);

    // Reset simulator
    ctrl.reset();
    assert.equal(ctrl.getCurrentVolumeAdded(), 0);
    assert.equal(ctrl.getLog().length, 1);
  });

  it('evaluates formative diagnostic concentration estimation within 3% tolerance', () => {
    const ctrl = new TitrationSimulatorController();
    // True target concentration is 0.085 M

    // Valid estimation within 3% (e.g. 0.086 M -> 1.18% error)
    const resGood = ctrl.submitUnknownEstimation(0.086);
    assert.equal(resGood.isCorrect, true);
    assert.ok(resGood.feedback.includes('within 3%'));

    // Invalid estimation beyond 3% (e.g. 0.070 M -> 17.6% error)
    const resBad = ctrl.submitUnknownEstimation(0.070);
    assert.equal(resBad.isCorrect, false);
    assert.ok(resBad.feedback.includes('deviates by'));
  });
});
