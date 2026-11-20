/**
 * tests/runtime/test_labs_hub.spec.ts
 * Unit tests for Standalone Labs Hub, Router matching, and STEM Workbench Controllers.
 */

import assert from 'node:assert/strict';
import { test } from 'node:test';
import { Router } from '../../web/app/router.ts';
import {
  LabsHubController,
  STANDALONE_LABS_CATALOG,
} from '../../web/pages/labs-hub.ts';
import { MotionSuiteController } from '../../web/pages/workbenches/motion-suite.ts';
import { VectorAlgebraController } from '../../web/pages/workbenches/vector-algebra.ts';
import { FluidPressureController } from '../../web/pages/workbenches/fluid-pressure.ts';
import { GasLawsController } from '../../web/pages/workbenches/gas-laws.ts';
import { ChemicalBondingController } from '../../web/pages/workbenches/chemical-bonding.ts';
import { MoleConceptController } from '../../web/pages/workbenches/mole-concept.ts';
import { LinearCoordinatesController } from '../../web/pages/workbenches/linear-coordinates.ts';

test('Standalone Labs Hub & Router Parity Tests', async (t) => {
  await t.test('1. Router matches /labs and /labs/:labId routes', () => {
    const router = new Router();

    const hubMatch = router.match('/labs');
    assert.equal(hubMatch.type, 'LAB_HUB');

    const resHubMatch = router.match('/resources');
    assert.equal(resHubMatch.type, 'LAB_HUB');

    const labViewMatch = router.match('/labs/lab:mole-concept-reactor');
    assert.equal(labViewMatch.type, 'LAB');
    assert.equal(labViewMatch.params.labId, 'lab:mole-concept-reactor');

    const labView2 = router.match('/labs/lab:gas-laws-suite');
    assert.equal(labView2.type, 'LAB');
    assert.equal(labView2.params.labId, 'lab:gas-laws-suite');
  });

  await t.test('2. STANDALONE_LABS_CATALOG contains 16 verified STEM workbenches', () => {
    assert.equal(STANDALONE_LABS_CATALOG.length, 16);

    const counts = {
      physics: STANDALONE_LABS_CATALOG.filter(l => l.discipline === 'PHYSICS').length,
      chemistry: STANDALONE_LABS_CATALOG.filter(l => l.discipline === 'CHEMISTRY').length,
      mathematics: STANDALONE_LABS_CATALOG.filter(l => l.discipline === 'MATHEMATICS').length,
    };

    assert.equal(counts.physics, 6, 'Must include 6 physics workbenches');
    assert.equal(counts.chemistry, 6, 'Must include 6 chemistry workbenches');
    assert.equal(counts.mathematics, 4, 'Must include 4 mathematics workbenches');

    // All must be under HOLD
    for (const lab of STANDALONE_LABS_CATALOG) {
      assert.equal(lab.status, 'HOLD');
      assert(lab.formulaBadge.length > 0);
    }
  });

  await t.test('3. LabsHubController multi-facet filtering and search', () => {
    const ctrl = new LabsHubController();
    assert.equal(ctrl.getFilteredLabs().length, 16);

    // Filter by Physics
    ctrl.setDiscipline('PHYSICS');
    assert.equal(ctrl.getFilteredLabs().length, 6);

    // Filter by Chemistry Simulator
    ctrl.setDiscipline('CHEMISTRY');
    ctrl.setModality('SIMULATOR');
    const chemSims = ctrl.getFilteredLabs();
    assert(chemSims.length >= 3);
    assert(chemSims.every(l => l.discipline === 'CHEMISTRY' && l.modality === 'SIMULATOR'));

    // Search query
    ctrl.setDiscipline('ALL');
    ctrl.setModality('ALL');
    ctrl.setSearchQuery('thermodynamics');
    const searchRes = ctrl.getFilteredLabs();
    assert.equal(searchRes.length, 1);
    assert.equal(searchRes[0].id, 'lab-gas-laws-suite');
  });

  await t.test('4. MotionSuiteController kinematic calculations', () => {
    const c = new MotionSuiteController();
    c.update1D({ initialVelocity: 15, acceleration: 3, time: 4 });
    const r1D = c.get1DResults();
    // v = 15 + 3*4 = 27 m/s
    // s = 15*4 + 0.5*3*16 = 60 + 24 = 84 m
    assert.equal(r1D.velocity, 27);
    assert.equal(r1D.displacement, 84);

    c.updateProjectile({ initialSpeed: 20, launchAngleDeg: 30, gravity: 10 });
    const rProj = c.getProjectileResults();
    // vy0 = 20 * sin(30) ≈ 10
    // timeOfFlight = 2 * 10 / 10 ≈ 2.0 s
    assert(Math.abs(rProj.timeOfFlight - 2.0) < 1e-6);
    assert(Math.abs(rProj.maxHeight - 5.0) < 1e-6); // 100 / 20 = 5.0 m
  });

  await t.test('5. VectorAlgebraController 3D operations', () => {
    const c = new VectorAlgebraController();
    c.setVectorA({ x: 1, y: 0, z: 0 });
    c.setVectorB({ x: 0, y: 1, z: 0 });

    assert.equal(c.dotProduct(), 0);
    assert.equal(c.angleDeg(), 90);
    const cross = c.crossProduct();
    assert.deepEqual(cross, { x: 0, y: 0, z: 1 });
  });

  await t.test('6. FluidPressureController hydrostatic and Pascal mechanics', () => {
    const c = new FluidPressureController();
    c.setHydrostatic(1000, 5.0); // 1000 kg/m^3 at 5m
    const hRes = c.getHydrostaticResults();
    // gauge = 1000 * 9.8 * 5 = 49000 Pa = 49 kPa
    assert.equal(hRes.gaugePressure, 49000);

    c.setPascal(100, 0.20); // f1 = 100N, a1 = 0.01, a2 = 0.20 -> MA = 20
    const pRes = c.getPascalResults();
    assert.equal(pRes.mechanicalAdvantage, 20);
    assert.equal(pRes.f2, 2000);
  });

  await t.test('7. GasLawsController ideal gas & Graham effusion', () => {
    const c = new GasLawsController();
    c.setThermodynamics(300, 24.942, 1.0); // P = 1 * 8.314 * 300 / 0.024942 ≈ 100000 Pa = 100 kPa
    const p = c.getPressure();
    assert(Math.abs(p - 100000) < 100);

    const ratio = c.getGrahamRatio(); // He (4) vs O2 (32) -> sqrt(32/4) = sqrt(8) ≈ 2.828
    assert(Math.abs(ratio - 2.828) < 0.01);
  });

  await t.test('8. ChemicalBondingController molecular lookup', () => {
    const c = new ChemicalBondingController();
    c.selectMolecule('ch4');
    const mol = c.getSelectedMolecule();
    assert.equal(mol.formula, 'CH₄');
    assert.equal(mol.geometry, 'Tetrahedral');
    assert.equal(mol.valenceTotal, 8);
  });

  await t.test('9. MoleConceptController conversions and stoichiometry', () => {
    const c = new MoleConceptController();
    c.selectCompound('H₂O');
    c.setInputMass(36.03);
    const mRes = c.getMoleResults();
    assert(Math.abs(mRes.moles - 2.0) < 0.01);

    // 2 H2 + O2 -> 2 H2O. If 4g H2 (approx 2 mol) and 16g O2 (approx 0.5 mol)
    // 0.5 mol O2 requires 1 mol H2 -> O2 is limiting reagent
    c.setStoichiometryInputs(4.0, 16.0);
    const stoich = c.getStoichiometryResults();
    assert.equal(stoich.limitingReagent, 'O₂');
    assert(Math.abs(stoich.yieldWaterMoles - 1.0) < 0.05);
  });

  await t.test('10. LinearCoordinatesController linear system solver', () => {
    const c = new LinearCoordinatesController();
    // L1: 2x + y = 5
    // L2: x - y = 1 -> intersection at (2, 1)
    c.setLine1({ a: 2, b: 1, c: 5 });
    c.setLine2({ a: 1, b: -1, c: 1 });
    const sol = c.getSystemSolution();
    assert.equal(sol.status, 'UNIQUE');
    assert(sol.intersection !== null);
    assert.equal(sol.intersection.x, 2);
    assert.equal(sol.intersection.y, 1);

    // Parallel lines: 2x + y = 5 and 2x + y = 10
    c.setLine2({ a: 2, b: 1, c: 10 });
    const solParallel = c.getSystemSolution();
    assert.equal(solParallel.status, 'PARALLEL_NO_SOLUTION');
    assert.equal(solParallel.intersection, null);
  });
});
