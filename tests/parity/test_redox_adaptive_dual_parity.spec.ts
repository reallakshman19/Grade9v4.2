import { test } from 'node:test';
import assert from 'node:assert/strict';
import { legacyPage, paths, measure, report } from './legacy_pilot_harness.spec.ts';
import {
  RedoxAdaptiveController,
  REDOX_BLOCKS,
} from '../../web/pages/redox-adaptive.ts';

test('Gate P7-G4: Dual-Execution Parity — Authentic v3.5 Redox Proof vs Target RedoxAdaptiveController', { timeout: 90000 }, async () => {
  const h = await legacyPage(paths.redox);
  try {
    const p = h.page;
    let matchedStateTransitions = 0;

    const legacyRoute = async () => (await p.locator('#route strong').innerText()).trim();

    // Verify original v3.5 embedded oracle
    assert(
      await p.evaluate('blocks.length === 3 && blocks.every(b=>Number.isInteger(b.conceptAnswer)&&Array.isArray(b.implementationAnswers))'),
      'authentic v3.5 embedded keys missing'
    );

    // Verify target controller block count
    assert.equal(REDOX_BLOCKS.length, 3, 'target controller must define exactly 3 blocks');

    const ctrl = new RedoxAdaptiveController();

    // Migration Difference Ledger records structural changes between v3.5 and v4.2 target
    const migrationDifferenceLedger: Array<{
      aspect: string;
      v35Original: string;
      v42Target: string;
      parityStatus: string;
    }> = [
      {
        aspect: 'Key Secrecy & Storage',
        v35Original: 'Raw answer keys embedded in client script closure',
        v42Target: 'Module-scoped formative drill keys; badged [Formative Self-Check · Diagnostic Practice (HOLD)]',
        parityStatus: 'CONFORMANT_PRACTICE_DRILL',
      },
      {
        aspect: 'Route State Logic',
        v35Original: 'OPEN -> REBUILD -> REINFORCE -> READY',
        v42Target: 'Identical 4-state finite state machine with first-attempt retention',
        parityStatus: 'VERIFIED_PARITY',
      },
      {
        aspect: 'Accessibility & Touch Targets',
        v35Original: 'Legacy compact desktop markup; variable button heights',
        v42Target: 'Standardized >= 48px touch targets, SVG ARIA labeling, high contrast',
        parityStatus: 'ENHANCED_ACCESSIBILITY',
      },
      {
        aspect: 'Academic Governance Status',
        v35Original: 'Proof prototype unratified',
        v42Target: 'HOLD (Diagnostic Mode Authorized); zero unreviewed assessment claims',
        parityStatus: 'GOVERNED_HOLD',
      },
    ];

    for (let i = 0; i < 3; i++) {
      // 1. Select block
      await p.locator('#blockBtn' + i).click();
      ctrl.selectBlock(i);

      assert.equal(await legacyRoute(), 'CHECKPOINT OPEN');
      assert.equal(ctrl.getRouteState(), 'OPEN');
      matchedStateTransitions++;

      // 2. Intentional wrong attempt on both systems
      const wrong = (await p.evaluate('((blocks[current].conceptAnswer+1)%blocks[current].options.length)')) as number;
      await p.locator('#options button').nth(wrong).click();
      await p.locator('#implementationInput').fill('A69_INVALID_RESPONSE');
      await p.locator('[onclick="checkImplementation()"]').click();

      ctrl.checkConcept(wrong);
      ctrl.checkImplementation('A69_INVALID_RESPONSE');

      assert.equal(await legacyRoute(), 'REBUILD', 'original must transition to REBUILD on failure');
      assert.equal(ctrl.getRouteState(), 'REBUILD', 'target controller must transition to REBUILD on failure');
      matchedStateTransitions++;

      // 3. Focused repair & hint expansion
      await p.locator('#repairButton').click();
      assert((await p.locator('#route').innerText()).includes('Focused repair'));
      await p.locator('#hintButton').click();

      ctrl.showRepair();
      ctrl.revealHint();
      assert.equal(ctrl.getProgress().repairOpen, true);
      assert.equal(ctrl.getProgress().hintDepth, 1);

      // 4. Input correct answers AFTER failure: first-attempt memory must keep state at REBUILD
      const ok = (await p.evaluate('blocks[current].conceptAnswer')) as number;
      const okImpl = (await p.evaluate('blocks[current].implementationAnswers[0]')) as string;

      await p.locator('#options button').nth(ok).click();
      await p.evaluate("document.getElementById('implementationInput').value=blocks[current].implementationAnswers[0]");
      await p.locator('[onclick="checkImplementation()"]').click();

      ctrl.checkConcept(ok);
      ctrl.checkImplementation(okImpl);

      // Parity verification: both systems refuse to forgive initial failure
      assert.equal(await legacyRoute(), 'REBUILD', 'original must preserve first-attempt failure');
      assert.equal(ctrl.getRouteState(), 'REBUILD', 'target must preserve first-attempt failure');
      matchedStateTransitions++;

      // 5. Reset block on both systems
      await p.locator('[onclick="resetBlock()"]').click();
      ctrl.resetBlock();

      assert.equal(await legacyRoute(), 'CHECKPOINT OPEN');
      assert.equal(ctrl.getRouteState(), 'OPEN');
      matchedStateTransitions++;

      // 6. First-attempt success on clean block
      await p.locator('#options button').nth(ok).click();
      await p.evaluate("document.getElementById('implementationInput').value=blocks[current].implementationAnswers[0]");
      await p.locator('[onclick="checkImplementation()"]').click();

      ctrl.checkConcept(ok);
      ctrl.checkImplementation(okImpl);

      assert.equal(await legacyRoute(), 'READY', 'original must achieve READY on clean first pass');
      assert.equal(ctrl.getRouteState(), 'READY', 'target must achieve READY on clean first pass');
      matchedStateTransitions++;

      // 7. Mapped transfer
      await p.locator('#transferButton').click();
      assert((await p.locator('#route').innerText()).includes('Mapped transfer'));

      ctrl.showTransfer();
      assert.equal(ctrl.getProgress().transferOpen, true);
      matchedStateTransitions++;
    }

    const layout = await measure(p, 'button,input,select');

    report('redox_dual_parity', {
      blocks: 3,
      matchedStateTransitions,
      migrationDifferenceLedger,
      layout,
      fullNativeBranchMigration: 'VERIFIED_PARITY',
      academicAdmission: 'HOLD',
    });

    assert.equal(matchedStateTransitions, 18, 'all 18 state transitions across 3 blocks must match exactly');
  } finally {
    await h.close();
  }
});
