import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { setupTransfer, artifact } from '../fixtures/wave8-synthetic.ts';
import { Core1BTransferJourney } from '../../web/journeys/core1b.ts';
import type { WorkArtifact, Response } from '../../web/runtime/types.ts';

describe('Gate P5-G3: Core 1B Guided Reconstruction Runtime Verification', () => {
  const responses: Record<string, Response> = {
    a: { kind: 'INTEGER', value: '7' },
    b: { kind: 'CONSTRUCTED_RESPONSE', value: 'step work' },
  };

  it('progresses cleanly through all 7 stages: PREDICT -> ATTEMPT -> RECONSTRUCT -> DIAGNOSE -> REPAIR -> BOUNDARY_TEST -> COMPLETE', async () => {
    const f = await setupTransfer();
    const journey = f.make();

    // 1. Initial Start -> PREDICT
    await journey.start();
    assert.equal(journey.getStage(), 'PREDICT');
    assert.equal(journey.isFirstAttemptCommitted(), false);
    assert.equal(journey.isBoundaryCommitted(), false);

    // 2. Predict -> ATTEMPT
    await journey.predict(0);
    assert.equal(journey.getStage(), 'ATTEMPT');
    const pred = journey.getPrediction();
    assert.equal(pred.index, 0);

    // 3. Attempt draft & commit -> RECONSTRUCT
    journey.setResponses(responses, [artifact('art:attempt-1')]);
    await journey.saveDraft();
    await journey.commitFirstAttempt();
    assert.equal(journey.getStage(), 'RECONSTRUCT');
    assert.equal(journey.isFirstAttemptCommitted(), true);

    // Solution A is now available for reconstruction comparison
    const solA = await journey.getTaskASolution();
    assert.equal(solA, 'REVIEWED_FIRST_REFERENCE');

    // 4. Compare -> DIAGNOSE
    await journey.completeReconstruction({
      'move:one': { observation: 'matches canonical relation' },
      'move:two': { observation: 'diverged on sign convention' },
    });
    assert.equal(journey.getStage(), 'DIAGNOSE');

    // 5. Diagnose -> REPAIR
    await journey.commitDiagnosis('move:two', 'Misinterpreted normal force direction relative to incline angle');
    assert.equal(journey.getStage(), 'REPAIR');

    // 6. Repair -> BOUNDARY_TEST
    await journey.commitRepair('Corrected equation: N = m * g * cos(theta)', [artifact('art:repair-1')]);
    assert.equal(journey.getStage(), 'BOUNDARY_TEST');

    // 7. Boundary Attempt & Complete
    journey.setResponses({ c: { kind: 'INTEGER', value: '8' } }, [artifact('art:boundary-1')]);
    await journey.commitBoundaryAttempt();
    assert.equal(journey.isBoundaryCommitted(), true);

    // View boundary feedback discloses Task B solution
    const solB = await journey.viewBoundaryFeedback();
    assert.equal(solB, 'REVIEWED_BOUNDARY_REFERENCE');

    // Return to source
    const returnTarget = await journey.returnToSource();
    assert.equal(returnTarget.sessionId, f.os.id);
    assert.equal(returnTarget.cursor, 7);
    assert.equal(journey.isSourceReturned(), true);
  });

  it('enforces precommit secrecy: solutions sealed prior to stage commitments', async () => {
    const f = await setupTransfer();
    const journey = f.make();
    await journey.start();

    // Solution A must be withheld during PREDICT and ATTEMPT
    assert.equal(await journey.getTaskASolution(), null);

    await journey.predict(0);
    assert.equal(await journey.getTaskASolution(), null);

    // Boundary stimulus sealed before BOUNDARY_TEST stage
    assert.equal(await journey.readBoundaryStimulus(), null);
    assert.equal(await journey.getTaskBSolution(), null);
  });

  it('enforces durable restoration via restore() and rejects restoreDraft()', async () => {
    const f = await setupTransfer();
    const journey = f.make();
    await journey.start();
    await journey.predict(0);

    journey.setResponses(responses, [artifact('art:save-test')]);
    await journey.saveDraft();
    const draft = journey.toDraft();
    assert(draft);

    // P0 Enforcement: restoreDraft() must refuse local restore and throw USE_DURABLE_RESTORE
    assert.throws(() => {
      journey.restoreDraft(draft);
    }, /USE_DURABLE_RESTORE/);

    // Correct Durable Restore: instantiate new journey instance sharing the same storage driver
    const restoredJourney = f.make();
    await restoredJourney.restore();
    assert.equal(restoredJourney.getStage(), 'ATTEMPT');
    assert.deepEqual(restoredJourney.getResponses(), responses);
    assert.equal(restoredJourney.getWork().length, 1);
    assert.equal(restoredJourney.getWork()[0].id, 'art:save-test');
  });
});
