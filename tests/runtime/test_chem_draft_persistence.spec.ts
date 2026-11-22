import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { ChemicalWorkWorkspaceController } from '../../web/components/chemical-work.ts';
import { RedoxAdaptiveController } from '../../web/pages/redox-adaptive.ts';
import { TitrationSimulatorController } from '../../web/pages/titration.ts';

describe('Gate P7-G7: Durable Chemistry Draft Persistence & Session Restoration', () => {
  it('performs lossless roundtrip draft serialization and restoration on ChemicalWorkWorkspaceController', () => {
    const ws = new ChemicalWorkWorkspaceController({ archetype: 'CHEM_E1' });
    ws.setStructureFromKeyboard('FORMULA', 'C2H6O', 'Ethanol');
    ws.setEquation('C2H6O + 3O2 -> 2CO2 + 3H2O');
    ws.setLearnerNotes('Clean stoichiometric combustion.');

    const draft = ws.exportDraft();
    assert.equal(draft.archetype, 'CHEM_E1');
    assert.equal(draft.structure?.data, 'C2H6O');
    assert.equal(draft.balancedEquation, 'C2H6O + 3O2 -> 2CO2 + 3H2O');
    assert.equal(draft.learnerNotes, 'Clean stoichiometric combustion.');
    assert.ok(draft.revision >= 1);

    // Restore into fresh controller
    const restored = new ChemicalWorkWorkspaceController({ archetype: 'CHEM_E1' });
    restored.restoreDraft(draft);

    const redraft = restored.exportDraft();
    assert.equal(redraft.archetype, draft.archetype);
    assert.equal(redraft.structure?.data, draft.structure?.data);
    assert.equal(redraft.balancedEquation, draft.balancedEquation);
    assert.equal(redraft.learnerNotes, draft.learnerNotes);
    assert.equal(redraft.revision, draft.revision);
  });

  it('strictly rejects foreign archetype drafts and corrupted revisions fail-closed', () => {
    const ws1 = new ChemicalWorkWorkspaceController({ archetype: 'CHEM_E1' });
    ws1.setEquation('H2 + Cl2 -> 2HCl');
    const draft1 = ws1.exportDraft();

    // Restoring CHEM_E1 draft into CHEM_E2 controller must throw
    const ws2 = new ChemicalWorkWorkspaceController({ archetype: 'CHEM_E2' });
    assert.throws(
      () => ws2.restoreDraft(draft1),
      /Foreign or invalid chemical draft/
    );

    // Corrupted revision (non-positive or non-integer)
    const badRev = { ...draft1, revision: 0 };
    assert.throws(
      () => ws1.restoreDraft(badRev),
      /Foreign or invalid chemical draft/
    );
  });

  it('persists and restores multi-block progress in RedoxAdaptiveController', () => {
    const ctrl = new RedoxAdaptiveController();
    ctrl.selectBlock(1);
    ctrl.checkConcept(1); // Solves or attempts concept
    ctrl.revealHint(); // Depth = 1

    const state = ctrl.exportState();
    assert.equal(state.currentBlockIndex, 1);
    assert.equal(state.progress[1]!.hintDepth, 1);

    const restoredCtrl = new RedoxAdaptiveController();
    restoredCtrl.restoreState(state);

    assert.equal(restoredCtrl.getCurrentBlockIndex(), 1);
    assert.equal(restoredCtrl.getProgress(1).hintDepth, 1);
    assert.equal(restoredCtrl.getProgress(1).conceptFirst, state.progress[1]!.conceptFirst);

    // Malformed state rejection
    assert.throws(
      () => restoredCtrl.restoreState({ currentBlockIndex: 99, progress: [] } as any),
      /Foreign or invalid redox adaptive state/
    );
  });

  it('persists and restores simulation state, volume log, and indicator in TitrationSimulatorController', () => {
    const ctrl = new TitrationSimulatorController();
    ctrl.setMode('STRONG_STRONG');
    ctrl.setIndicator('METHYL_ORANGE');
    ctrl.dispense(12.5);

    const state = ctrl.exportState();
    assert.equal(state.config.mode, 'STRONG_STRONG');
    assert.equal(state.indicator, 'METHYL_ORANGE');
    assert.equal(state.currentVolumeAddedMl, 12.5);
    assert.equal(state.log.length, 2);

    const restoredCtrl = new TitrationSimulatorController();
    restoredCtrl.restoreState(state);

    assert.equal(restoredCtrl.getConfig().mode, 'STRONG_STRONG');
    assert.equal(restoredCtrl.getIndicator(), 'METHYL_ORANGE');
    assert.equal(restoredCtrl.getCurrentVolumeAdded(), 12.5);
    assert.equal(restoredCtrl.getLog().length, 2);
    assert.equal(restoredCtrl.getCurrentPh(), ctrl.getCurrentPh());

    // Malformed state rejection
    assert.throws(
      () => restoredCtrl.restoreState({} as any),
      /Foreign or invalid titration simulator state/
    );
  });
});
