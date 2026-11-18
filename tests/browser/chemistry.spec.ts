/**
 * tests/browser/chemistry.spec.ts
 * A28 — Chemical representation workspace test suite.
 *
 * Verifies:
 * - Structure capture and accessible text representation (Formula, SMILES, Hill notation, Molar mass)
 * - Safe 2D structure SVG rendering without script injection
 * - Reaction stoichiometry balance checker (balanced vs unbalanced equations)
 * - Reaction mechanism steps progression, reordering, and accessible narrative
 * - Spectra data representation (IR, 1H-NMR) and accessible table alternatives
 * - Keyboard-accessible alternative for all chemical operations
 * - Pedagogical invariant: CHEM E2 & E3 submissions are NEVER auto-graded (points: null, REVIEW_PENDING)
 * - Exact draft restoration with zero data loss
 * - Touch targets >= 48px
 *
 * No academic approval inferred from software validation.
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import {
  parseFormula,
  formatHillFormula,
  calculateMolarMass,
  validateSMILES,
  generateAccessibleStructureText,
  renderStructureSvg,
} from '../../web/adapters/chemistry/structure.ts';
import {
  checkReactionBalance,
  ReactionMechanismManager,
} from '../../web/adapters/chemistry/reactions.ts';
import {
  generateAccessibleSpectraText,
  renderSpectrumSvg,
  formatMultiplicity,
} from '../../web/adapters/chemistry/spectra.ts';
import {
  ChemicalWorkWorkspaceController,
} from '../../web/components/chemical-work.ts';
import type {
  ChemicalStructureData,
  ChemicalSpectrum,
  ReactionStep,
} from '../../web/adapters/chemistry/types.ts';

describe('A28 Chemical Domain Adapter: Structure & Formulas', () => {
  it('parses simple and polyatomic chemical formulas into atom counts', () => {
    const water = parseFormula('H2O');
    assert.deepEqual(water, { H: 2, O: 1 });

    const ethanol = parseFormula('C2H5OH');
    assert.deepEqual(ethanol, { C: 2, H: 6, O: 1 });

    const calciumHydroxide = parseFormula('Ca(OH)2');
    assert.deepEqual(calciumHydroxide, { Ca: 1, O: 2, H: 2 });

    const ironSulfate = parseFormula('Fe2(SO4)3');
    assert.deepEqual(ironSulfate, { Fe: 2, S: 3, O: 12 });
  });

  it('formats elemental counts into canonical Hill system notation', () => {
    // Carbon first, Hydrogen second, alphabetical rest
    const ethanolCounts = { H: 6, C: 2, O: 1 };
    assert.equal(formatHillFormula(ethanolCounts), 'C2H6O');

    // Without Carbon, alphabetical order
    const sulfuricCounts = { H: 2, S: 1, O: 4 };
    assert.equal(formatHillFormula(sulfuricCounts), 'H2O4S');
  });

  it('calculates accurate molar mass for known molecules', () => {
    const waterCounts = parseFormula('H2O');
    const waterMass = calculateMolarMass(waterCounts);
    // 2 * 1.008 + 15.999 = 18.015
    assert.equal(waterMass, 18.015);

    const ethanolCounts = parseFormula('C2H6O');
    const ethanolMass = calculateMolarMass(ethanolCounts);
    // 2 * 12.011 + 6 * 1.008 + 15.999 = 24.022 + 6.048 + 15.999 = 46.069
    assert.equal(ethanolMass, 46.069);
  });

  it('validates SMILES strings and handles ring closures and branches', () => {
    // Ethanol SMILES: CCO
    const ethRes = validateSMILES('CCO');
    assert.equal(ethRes.isValid, true);
    assert.equal(ethRes.atomCounts['C'], 2);
    assert.equal(ethRes.atomCounts['O'], 1);

    // Benzene SMILES: c1ccccc1
    const benRes = validateSMILES('c1ccccc1');
    assert.equal(benRes.isValid, true);
    assert.equal(benRes.atomCounts['C'], 6);

    // Unbalanced parentheses in SMILES
    const badParen = validateSMILES('CC(O');
    assert.equal(badParen.isValid, false);
    assert.match(badParen.error || '', /parenthesis/i);

    // Unmatched closing bracket
    const badBracket = validateSMILES('C[OH');
    assert.equal(badBracket.isValid, false);
    assert.match(badBracket.error || '', /bracket/i);
  });

  it('generates accessible screen-reader descriptions and safe SVG without scripts', () => {
    const struct: ChemicalStructureData = {
      format: 'FORMULA',
      data: 'C2H6O',
      accessibleLabel: '',
      iupacName: 'Ethanol',
    };

    const text = generateAccessibleStructureText(struct);
    assert.match(text, /Hill notation: C2H6O/);
    assert.match(text, /46\.069 g\/mol/);

    const svg = renderStructureSvg(struct, 300, 200);
    assert.ok(svg.includes('xmlns="http://www.w3.org/2000/svg"'));
    assert.ok(svg.includes('role="img"'));
    assert.ok(!svg.includes('<script'));
    assert.ok(!svg.includes('javascript:'));
  });
});

describe('A28 Chemical Domain Adapter: Reactions & Stoichiometry', () => {
  it('correctly balances chemical equations across standard reaction arrows', () => {
    // Balanced water synthesis
    const res1 = checkReactionBalance('2 H2 + O2 -> 2 H2O');
    assert.equal(res1.isBalanced, true);
    assert.equal(res1.imbalances.length, 0);

    // Unbalanced water synthesis
    const res2 = checkReactionBalance('H2 + O2 -> H2O');
    assert.equal(res2.isBalanced, false);
    assert.equal(res2.imbalances.length, 1);
    assert.equal(res2.imbalances[0]!.element, 'O');
    assert.equal(res2.imbalances[0]!.reactantCount, 2);
    assert.equal(res2.imbalances[0]!.productCount, 1);

    // Methane combustion
    const res3 = checkReactionBalance('CH4 + 2 O2 -> CO2 + 2 H2O');
    assert.equal(res3.isBalanced, true);
  });

  it('manages reaction mechanism steps and generates accessible progression summaries', () => {
    const manager = new ReactionMechanismManager();

    const step1 = manager.addStep({
      id: 'step-1',
      equation: 'CH3Br + OH- -> [HO...CH3...Br]-',
      reagents: 'NaOH (aq)',
      mechanismType: 'NUCLEOPHILIC_ATTACK',
      intermediateName: 'Trigonal bipyramidal transition state',
      accessibleDescription: 'Hydroxide attacks methyl bromide from backside.',
    });

    const step2 = manager.addStep({
      id: 'step-2',
      equation: '[HO...CH3...Br]- -> CH3OH + Br-',
      mechanismType: 'SUBSTITUTION',
      notes: 'Inversion of stereocenter (Walden inversion).',
      accessibleDescription: 'Bromide departs, yielding methanol.',
    });

    assert.equal(manager.getSteps().length, 2);
    assert.equal(step1.stepNumber, 1);
    assert.equal(step2.stepNumber, 2);

    const summary = manager.generateAccessibleSummary();
    assert.match(summary, /2 sequential steps/);
    assert.match(summary, /Step 1: CH3Br \+ OH-/);
    assert.match(summary, /Step 2: \[HO\.\.\.CH3\.\.\.Br\]-/);

    // Test reorder
    manager.reorderSteps(1, 0);
    const reordered = manager.getSteps();
    assert.equal(reordered[0]!.id, 'step-2');
    assert.equal(reordered[0]!.stepNumber, 1);
    assert.equal(reordered[1]!.id, 'step-1');
    assert.equal(reordered[1]!.stepNumber, 2);

    // Test removal
    manager.removeStep('step-2');
    assert.equal(manager.getSteps().length, 1);
    assert.equal(manager.getSteps()[0]!.stepNumber, 1);
  });
});

describe('A28 Chemical Domain Adapter: Spectra & Accessible Data', () => {
  it('formats peak multiplicities correctly', () => {
    assert.equal(formatMultiplicity('s'), 'singlet');
    assert.equal(formatMultiplicity('d'), 'doublet');
    assert.equal(formatMultiplicity('t'), 'triplet');
    assert.equal(formatMultiplicity('q'), 'quartet');
  });

  it('generates accessible spectra summaries and safe SVG charts', () => {
    const irSpectrum: ChemicalSpectrum = {
      id: 'spec-ir-1',
      type: 'IR',
      title: 'Acetone Infrared Spectrum',
      unit: 'cm^-1',
      accessibleDescription: '',
      peaks: [
        { position: 1715, intensity: 0.95, label: 'C=O carbonyl stretch' },
        { position: 2960, intensity: 0.45, label: 'C-H sp3 stretch' },
        { position: 1365, intensity: 0.50, label: 'CH3 bend' },
      ],
    };

    const text = generateAccessibleSpectraText(irSpectrum);
    assert.match(text, /Acetone Infrared Spectrum \(IR\): 3 distinct peaks identified/);
    assert.match(text, /1715 cm\^-1/);
    assert.match(text, /C=O carbonyl stretch/);

    const svg = renderSpectrumSvg(irSpectrum, 400, 250);
    assert.ok(svg.includes('xmlns="http://www.w3.org/2000/svg"'));
    assert.ok(svg.includes('role="img"'));
    assert.ok(!svg.includes('<script'));
  });
});

describe('A28 Chemical Workspace Component: Invariants & Keyboard Alternative', () => {
  it('enforces pedagogical invariant: CHEM E2 & E3 work is NEVER auto-graded (points: null)', () => {
    // CHEM E2: Organic mechanism
    const e2Workspace = new ChemicalWorkWorkspaceController({
      archetype: 'CHEM_E2',
      initialStructure: {
        format: 'SMILES',
        data: 'CC(=O)O',
        accessibleLabel: 'Acetic acid',
      },
    });

    e2Workspace.addMechanismStepFromKeyboard('CH3COOH + SOCl2 -> CH3COCl + SO2 + HCl', 'SOCl2', 'Reflux', 'SUBSTITUTION');

    const evalE2 = e2Workspace.evaluate();
    assert.equal(evalE2.status, 'REVIEW_PENDING');
    assert.equal(evalE2.points, null);
    assert.equal(evalE2.isAutoGraded, false);
    assert.ok(evalE2.rubricCriteria && evalE2.rubricCriteria.length > 0);
    assert.match(evalE2.feedback, /expert chemical review/i);

    // CHEM E3: Analytical / Spectroscopic elucidation
    const e3Workspace = new ChemicalWorkWorkspaceController({
      archetype: 'CHEM_E3',
      spectra: [
        {
          id: 'spec-nmr-1',
          type: 'NMR_1H',
          title: 'Unknown Compound A 1H-NMR',
          unit: 'ppm',
          accessibleDescription: 'Two peaks: triplet at 1.2 ppm (3H) and quartet at 3.5 ppm (2H)',
          peaks: [
            { position: 1.2, intensity: 0.6, multiplicity: 't', integration: 3 },
            { position: 3.5, intensity: 0.4, multiplicity: 'q', integration: 2 },
          ],
        },
      ],
    });

    const evalE3 = e3Workspace.evaluate();
    assert.equal(evalE3.status, 'REVIEW_PENDING');
    assert.equal(evalE3.points, null);
    assert.equal(evalE3.isAutoGraded, false);
    assert.match(evalE3.feedback, /spectroscopic analysis/i);
  });

  it('allows automated validation for closed CHEM E1 stoichiometric equations', () => {
    const e1Workspace = new ChemicalWorkWorkspaceController({
      archetype: 'CHEM_E1',
      maxPoints: 5,
    });

    // Unbalanced equation
    e1Workspace.setEquation('N2 + H2 -> NH3');
    const evalFail = e1Workspace.evaluate();
    assert.equal(evalFail.status, 'SCORED');
    assert.equal(evalFail.points, 0);

    // Balanced Haber process equation
    e1Workspace.setEquation('N2 + 3 H2 -> 2 NH3');
    const evalPass = e1Workspace.evaluate();
    assert.equal(evalPass.status, 'SCORED');
    assert.equal(evalPass.points, 5);
  });

  it('provides complete keyboard alternative for structure, mechanism, and equations', () => {
    const controller = new ChemicalWorkWorkspaceController({
      archetype: 'CHEM_E2',
    });

    // Keyboard-driven structure entry
    controller.setStructureFromKeyboard('FORMULA', 'C6H12O6', 'D-Glucose');
    const struct = controller.getStructure();
    assert.ok(struct);
    assert.equal(struct.format, 'FORMULA');
    assert.equal(struct.molecularFormula, 'C6H12O6');
    assert.equal(struct.iupacName, 'D-Glucose');
    assert.equal(struct.molarMass, 180.156);

    // Keyboard-driven mechanism step entry
    const step = controller.addMechanismStepFromKeyboard(
      'C6H12O6 + 2 NAD+ -> 2 Pyruvate + 2 NADH',
      'Hexokinase, PFK',
      '37 deg C',
      'REDOX',
      'Glycolytic pathway'
    );
    assert.equal(controller.getMechanismSteps().length, 1);
    assert.equal(step.stepNumber, 1);

    // Keyboard-driven equation entry
    controller.setEquation('2 H2 + O2 -> 2 H2O');
    assert.equal(controller.checkBalance().isBalanced, true);
  });

  it('persists and restores draft state across lifecycle transitions without data loss', () => {
    const initialController = new ChemicalWorkWorkspaceController({
      archetype: 'CHEM_E2',
      initialStructure: {
        format: 'SMILES',
        data: 'CC(=O)Oc1ccccc1C(=O)O',
        accessibleLabel: 'Aspirin structure',
        iupacName: 'Acetylsalicylic acid',
      },
      learnerNotes: 'Synthesized via esterification of salicylic acid.',
    });

    initialController.addMechanismStepFromKeyboard(
      'C7H6O3 + C4H6O3 -> C9H8O4 + C2H4O2',
      'H3PO4 catalyst',
      'Warm bath',
      'SUBSTITUTION'
    );

    const exportedDraft = initialController.exportDraft();
    assert.equal(exportedDraft.archetype, 'CHEM_E2');
    assert.equal(exportedDraft.structure?.data, 'CC(=O)Oc1ccccc1C(=O)O');
    assert.equal(exportedDraft.mechanismSteps.length, 1);
    assert.equal(exportedDraft.learnerNotes, 'Synthesized via esterification of salicylic acid.');

    // Restore into fresh controller
    const restoredController = new ChemicalWorkWorkspaceController({
      archetype: 'CHEM_E1', // intentional mismatch to verify restore overrides
    });
    restoredController.restoreDraft(exportedDraft);

    const restoredState = restoredController.getViewState();
    assert.equal(restoredState.archetype, 'CHEM_E2');
    assert.equal(restoredState.structure?.data, 'CC(=O)Oc1ccccc1C(=O)O');
    assert.equal(restoredState.mechanismSteps.length, 1);
    assert.equal(restoredState.learnerNotes, 'Synthesized via esterification of salicylic acid.');
  });

  it('verifies all interactive elements conform to 48px hit target bounds', () => {
    const controller = new ChemicalWorkWorkspaceController({
      archetype: 'CHEM_E2',
    });
    const state = controller.getViewState();
    assert.equal(state.minHitTargetPx, 48);

    const html = controller.render();
    assert.ok(html.includes('min-height: 48px'));
    assert.ok(html.includes('min-width: 48px'));
    assert.ok(html.includes('role="tablist"'));
    assert.ok(html.includes('role="tabpanel"'));
  });
});
