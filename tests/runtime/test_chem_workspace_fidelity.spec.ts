import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  parseFormula,
  formatHillFormula,
  calculateMolarMass,
  validateSMILES,
} from '../../web/adapters/chemistry/structure.ts';
import {
  checkReactionBalance,
} from '../../web/adapters/chemistry/reactions.ts';
import {
  ChemicalWorkWorkspaceController,
} from '../../web/components/chemical-work.ts';

describe('Gate P7-G3: Chemical Representation Workspace & A28 Governance Fidelity', () => {
  it('parses formulas, orders elements in Hill notation, and calculates molar masses', () => {
    // 1. Water
    const water = parseFormula('H2O');
    assert.deepEqual(water, { H: 2, O: 1 });
    assert.equal(formatHillFormula(water), 'H2O');
    const waterMass = calculateMolarMass(water);
    assert.ok(Math.abs(waterMass - 18.015) < 0.05, `Water mass ${waterMass} should be ~18.015`);

    // 2. Ethanol
    const ethanol = parseFormula('C2H6O');
    assert.deepEqual(ethanol, { C: 2, H: 6, O: 1 });
    assert.equal(formatHillFormula(ethanol), 'C2H6O');
    const ethanolMass = calculateMolarMass(ethanol);
    assert.ok(Math.abs(ethanolMass - 46.069) < 0.05, `Ethanol mass ${ethanolMass} should be ~46.069`);

    // 3. Acetic Acid (expanded formula parsed into Hill notation C2H4O2)
    const acetic = parseFormula('CH3COOH');
    assert.deepEqual(acetic, { C: 2, H: 4, O: 2 });
    assert.equal(formatHillFormula(acetic), 'C2H4O2');
    const aceticMass = calculateMolarMass(acetic);
    assert.ok(Math.abs(aceticMass - 60.052) < 0.05, `Acetic acid mass ${aceticMass} should be ~60.052`);

    // 4. Potassium Permanganate (no carbon -> alphabetical Hill order: K, Mn, O)
    const kmno4 = parseFormula('KMnO4');
    assert.deepEqual(kmno4, { K: 1, Mn: 1, O: 4 });
    assert.equal(formatHillFormula(kmno4), 'KMnO4');
    const kmno4Mass = calculateMolarMass(kmno4);
    assert.ok(Math.abs(kmno4Mass - 158.034) < 0.05, `KMnO4 mass ${kmno4Mass} should be ~158.034`);

    // 5. Potassium Dichromate (no carbon -> alphabetical: Cr2 K2 O7)
    const k2cr2o7 = parseFormula('K2Cr2O7');
    assert.deepEqual(k2cr2o7, { K: 2, Cr: 2, O: 7 });
    assert.equal(formatHillFormula(k2cr2o7), 'Cr2K2O7');
    const k2cr2o7Mass = calculateMolarMass(k2cr2o7);
    assert.ok(Math.abs(k2cr2o7Mass - 294.185) < 0.1, `K2Cr2O7 mass ${k2cr2o7Mass} should be ~294.185`);
  });

  it('validates simplified SMILES inputs within bounded structural limits', () => {
    // Valid linear / simple branched SMILES
    const acetic = validateSMILES('CC(=O)O');
    assert.equal(acetic.isValid, true);
    assert.equal(acetic.atomCounts['C'], 2);
    assert.equal(acetic.atomCounts['O'], 2);

    const ethanol = validateSMILES('CCO');
    assert.equal(ethanol.isValid, true);
    assert.equal(ethanol.atomCounts['C'], 2);
    assert.equal(ethanol.atomCounts['O'], 1);

    const ethene = validateSMILES('C=C');
    assert.equal(ethene.isValid, true);
    assert.equal(ethene.atomCounts['C'], 2);

    // Benzene (aromatic ring)
    const benzene = validateSMILES('c1ccccc1');
    assert.equal(benzene.isValid, true);
    assert.equal(benzene.atomCounts['C'], 6);

    // Rejection 1: unclosed parentheses
    const unclosed = validateSMILES('CC(O');
    assert.equal(unclosed.isValid, false);
    assert.match(unclosed.error || '', /parenthesis/i);

    // Rejection 2: unmatched bracket
    const unclosedBracket = validateSMILES('C[OH');
    assert.equal(unclosedBracket.isValid, false);
    assert.match(unclosedBracket.error || '', /bracket/i);

    // Rejection 3: unpaired ring closure
    const unpairedRing = validateSMILES('C1CC');
    assert.equal(unpairedRing.isValid, false);
    assert.match(unpairedRing.error || '', /ring/i);
  });

  it('verifies net ionic charge balancing and redox disproportionation', () => {
    // 1. Single electron transfer: Fe2+ + Ce4+ -> Fe3+ + Ce3+
    const redox1 = checkReactionBalance('Fe2+ + Ce4+ -> Fe3+ + Ce3+');
    assert.equal(redox1.isBalanced, true);
    assert.equal(redox1.isChargeBalanced, true);
    assert.equal(redox1.isAtomBalanced, true);
    assert.equal(redox1.reactantCharge, 6);
    assert.equal(redox1.productCharge, 6);
    assert.equal(redox1.chargeImbalance, undefined);

    // 2. Disproportionation: 3MnO4^2- + 4H+ -> 2MnO4- + MnO2 + 2H2O
    const disp = checkReactionBalance('3MnO4^2- + 4H+ -> 2MnO4- + MnO2 + 2H2O');
    assert.equal(disp.isBalanced, true);
    assert.equal(disp.isChargeBalanced, true);
    assert.equal(disp.isAtomBalanced, true);
    assert.equal(disp.reactantCharge, -2);
    assert.equal(disp.productCharge, -2);
    assert.equal(disp.chargeImbalance, undefined);

    // 3. Atom-balanced but charge-unbalanced: Cu + Ag+ -> Cu2+ + Ag (1 of each is atom balanced, but charge +1 != +2)
    const unbalCharge = checkReactionBalance('Cu + Ag+ -> Cu2+ + Ag');
    assert.equal(unbalCharge.isBalanced, false);
    assert.equal(unbalCharge.isAtomBalanced, true);
    assert.equal(unbalCharge.isChargeBalanced, false);
    assert.deepEqual(unbalCharge.chargeImbalance, { reactantCharge: 1, productCharge: 2 });

    // 4. Properly balanced redox: Cu + 2Ag+ -> Cu2+ + 2Ag
    const balCharge = checkReactionBalance('Cu + 2Ag+ -> Cu2+ + 2Ag');
    assert.equal(balCharge.isBalanced, true);
    assert.equal(balCharge.isChargeBalanced, true);
    assert.equal(balCharge.isAtomBalanced, true);
    assert.equal(balCharge.reactantCharge, 2);
    assert.equal(balCharge.productCharge, 2);
  });

  it('enforces Workpack A28 governance invariant: open-ended synthesis remains REVIEW_PENDING with points withheld', () => {
    const ws2 = new ChemicalWorkWorkspaceController({ archetype: 'CHEM_E2' });
    ws2.setEquation('C2H5OH + [O] -> CH3CHO + H2O');
    const result2 = ws2.evaluate();
    assert.equal(result2.status, 'REVIEW_PENDING');
    assert.equal(result2.points, null);
    assert.equal(result2.isAutoGraded, false);
    assert.ok(result2.feedback.includes('expert chemical review') || result2.feedback.includes('Score withheld'));
    assert.ok(result2.rubricCriteria.length > 0);
    assert.ok(result2.rubricCriteria.every(c => c.awardedPoints === null));

    const ws3 = new ChemicalWorkWorkspaceController({ archetype: 'CHEM_E3' });
    const result3 = ws3.evaluate();
    assert.equal(result3.status, 'REVIEW_PENDING');
    assert.equal(result3.points, null);
    assert.equal(result3.isAutoGraded, false);
    assert.ok(result3.feedback.includes('domain assessment') || result3.feedback.includes('Score withheld'));
    assert.ok(result3.rubricCriteria.length > 0);
    assert.ok(result3.rubricCriteria.every(c => c.awardedPoints === null));
  });

  it('generates compliant typed WorkArtifact payloads on export', async () => {
    const ws = new ChemicalWorkWorkspaceController({ archetype: 'CHEM_E1' });
    ws.setStructureFromKeyboard('FORMULA', 'C6H12O6', 'Glucose');
    ws.setEquation('C6H12O6 + 6O2 -> 6CO2 + 6H2O');

    const artifact = await ws.toWorkArtifact('session-chem-001');
    assert.equal(artifact.kind, 'STRUCTURE');
    assert.equal(artifact.version, 1);
    assert.ok(artifact.id.startsWith('chem:'));
    assert.ok(artifact.id.length > 10);
    assert.equal((artifact.value as any).archetype, 'CHEM_E1');
    assert.equal((artifact.value as any).balancedEquation, 'C6H12O6 + 6O2 -> 6CO2 + 6H2O');
    assert.equal((artifact.value as any).structure.data, 'C6H12O6');
  });
});
