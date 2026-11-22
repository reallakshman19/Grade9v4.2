import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  validateIoqmInteger,
  createIoqmPaperWorkspaceConfig,
  createAuthorizedIoqmPaperSession,
} from '../../web/runtime/ioqm-session.ts';
import { PaperWorkspaceController } from '../../web/pages/paper.ts';

describe('Gate P6-G4: IOQM Timed Paper Workspace Authority & Integer Scoring', () => {
  it('validates IOQM integer answers strictly in range [00..99]', () => {
    // Valid inputs
    assert.deepEqual(validateIoqmInteger('0'), { isValid: true, normalizedValue: 0, formattedTwoDigit: '00' });
    assert.deepEqual(validateIoqmInteger('7'), { isValid: true, normalizedValue: 7, formattedTwoDigit: '07' });
    assert.deepEqual(validateIoqmInteger('42'), { isValid: true, normalizedValue: 42, formattedTwoDigit: '42' });
    assert.deepEqual(validateIoqmInteger('99'), { isValid: true, normalizedValue: 99, formattedTwoDigit: '99' });
    assert.deepEqual(validateIoqmInteger('00'), { isValid: true, normalizedValue: 0, formattedTwoDigit: '00' });

    // Invalid inputs: negative, decimals, >99, non-numeric
    assert.equal(validateIoqmInteger('-1').isValid, false);
    assert.equal(validateIoqmInteger('100').isValid, false);
    assert.equal(validateIoqmInteger('3.14').isValid, false);
    assert.equal(validateIoqmInteger('abc').isValid, false);
    assert.equal(validateIoqmInteger('').isValid, false);
    assert.equal(validateIoqmInteger(' 4 2 ').isValid, false);
  });

  it('configures 30 questions and 100 marks conforming to 2024 HBCSE structure', () => {
    const config = createIoqmPaperWorkspaceConfig();

    assert.equal(config.paperId, 'paper:ioqm-challenge-a');
    assert.equal(config.durationSeconds, 180 * 60); // 180 mins
    assert.equal(config.parts.length, 30);

    // Section distribution
    assert.equal(config.sections.length, 3);
    assert.equal(config.sections[0].id, 'sec-a');
    assert.equal(config.sections[0].partIds.length, 10);
    assert.equal(config.sections[1].id, 'sec-b');
    assert.equal(config.sections[1].partIds.length, 10);
    assert.equal(config.sections[2].id, 'sec-c');
    assert.equal(config.sections[2].partIds.length, 10);

    // Marks check: Section A (10 x 2 = 20), Section B (10 x 3 = 30), Section C (10 x 5 = 50) -> 100
    let totalMarks = 0;
    for (let i = 0; i < 10; i++) {
      assert.equal(config.parts[i].maxPoints, 2);
      totalMarks += 2;
    }
    for (let i = 10; i < 20; i++) {
      assert.equal(config.parts[i].maxPoints, 3);
      totalMarks += 3;
    }
    for (let i = 20; i < 30; i++) {
      assert.equal(config.parts[i].maxPoints, 5);
      totalMarks += 5;
    }
    assert.equal(totalMarks, 100);
  });

  it('strictly prohibits calculators while allowing scratchpad', () => {
    const config = createIoqmPaperWorkspaceConfig();

    assert.ok(config.allowedAids?.includes('SCRATCHPAD'));
    assert.equal(config.allowedAids?.includes('CALCULATOR'), false);
    assert.equal(config.allowedAids?.includes('FORMULA_SHEET'), false);
    assert.equal(config.allowedAids?.includes('PERIODIC_TABLE'), false);
  });

  it('binds authorized paper session and restores PaperWorkspaceController under SIMULATED_EXAM policy', async () => {
    const { config, binding } = await createAuthorizedIoqmPaperSession();
    const controller = new PaperWorkspaceController(config, binding);

    await controller.restore();

    assert.equal(controller.getPaperId(), 'paper:ioqm-challenge-a');
    assert.equal(controller.getTimer().getDurationSeconds(), 180 * 60);
    assert.equal(controller.getNavigation().getParts().length, 30);

    // Enter a valid integer response for part 1
    const ok = controller.setPartResponse('p-ioqm-01', { kind: 'INTEGER', value: '42' });
    assert.equal(ok, true);
    assert.deepEqual(controller.getPartResponse('p-ioqm-01'), { kind: 'INTEGER', value: '42' });

    // Enter invalid response kind (should fail closed)
    const bad = controller.setPartResponse('p-ioqm-02', { kind: 'SINGLE_CHOICE', value: 'opt-a' });
    assert.equal(bad, false);

    // Submit paper: returns sealed REVIEW_PENDING evaluation
    const evalResult = await controller.submitPaper();
    assert.equal(evalResult.status, 'REVIEW_PENDING');
    assert.equal(evalResult.totalPoints, null);
    assert.equal(evalResult.maxPoints, 100);
    assert.equal(evalResult.isFinal, false);
    assert.match(evalResult.summaryFeedback, /Scores and solutions sealed by examination policy/);
  });
});
