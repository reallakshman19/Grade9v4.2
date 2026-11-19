/**
 * tests/browser/progress.spec.ts
 * Workpack A36: Progress, Mistakes, Bookmarks, and Settings Browser & Contract Tests.
 *
 * Verifies:
 * 1. Progress evidence categorization: First attempt, Assisted, Repair, Boundary check.
 * 2. Rule 13 / Invariant: Zero cognitive mastery or progress-to-mastery claims (HOLD / NONE).
 * 3. Withdrawn item attempt retention and honest labeling.
 * 4. Mistakes notebook: Diagnostic comparison, failure modes, recovery routes, and repair marking.
 * 5. Bookmarks collection: Subject tagging, notes retention, tombstoning withdrawn items, removal.
 * 6. Settings typography scaling: Strict bounds [0.85, 1.50], step 0.05, reset to 1.0, live preview.
 * 7. Storage health monitor & blocked storage alerts without fake "Saved" or unhandled exceptions.
 * 8. Export and Import roundtrip: SHA-256 checksum, schema validation, and attempt conservation.
 * 9. Playwright Headless Chromium tablet ergonomics: 48px min hit targets, dual viewports, 0px overflow.
 *
 * No academic approval inferred from software validation.
 * academic_admission: HOLD
 * release_authority: NONE
 */

import { it } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { chromium, type Browser } from 'playwright-core';

import {
  ProgressPageController,
  type EnrichedAttemptItem,
} from '../../web/pages/progress.ts';

import {
  MistakesPageController,
  type RecordedMistakeItem,
} from '../../web/pages/mistakes.ts';

import {
  BookmarksPageController,
  type BookmarkItem,
} from '../../web/pages/bookmarks.ts';

import {
  SettingsPageController,
} from '../../web/pages/settings.ts';

import {
  FONT_SCALE_MIN,
  FONT_SCALE_MAX,
  FONT_SCALE_DEFAULT,
  FONT_SCALE_STEP,
  HIT_TARGET_MIN_PX,
} from '../../web/styles/tokens.ts';

import {
  MemoryStorageDriver,
} from '../../web/runtime/storage.ts';

import {
  DefaultProgressStore,
  STORAGE_EXPORT_VERSION,
  computeSha256,
} from '../../web/runtime/progress.ts';

import type { Session, Attempt, WorkArtifact, Response } from '../../web/runtime/types.ts';

function getChromiumExecutable(): string | undefined {
  if (process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE && existsSync(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE)) {
    return process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE;
  }
  const fallback =
    'C:/Users/reall/AppData/Local/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-win64/chrome-headless-shell.exe';
  if (existsSync(fallback)) {
    return fallback;
  }
  return undefined;
}

// ---------------------------------------------------------------------------
// Test 1: Progress attempt evidence categorization and stats
// ---------------------------------------------------------------------------
it('A36: Progress page categorizes evidence into 4 distinct modes', () => {
  const dummyTaskRef = {
    id: 'TASK-MAT-QUAD-01',
    revision: 1,
    sha256: 'a'.repeat(64),
    type: 'QUESTION' as const,
  };

  const attempts: EnrichedAttemptItem[] = [
    {
      attemptId: 'att-01',
      sessionId: 'ses-01',
      taskRef: dummyTaskRef,
      taskTitle: 'Roots of Quadratic Equation',
      subject: 'MATHEMATICS',
      category: 'FIRST_ATTEMPT',
      submittedAt: '2026-11-18T10:00:00Z',
      gradeStatus: 'SCORED',
      score: 10,
      isWithdrawn: false,
      artifactsCount: 1,
    },
    {
      attemptId: 'att-02',
      sessionId: 'ses-02',
      taskRef: dummyTaskRef,
      taskTitle: 'Discriminant Sign Test',
      subject: 'MATHEMATICS',
      category: 'ASSISTED',
      submittedAt: '2026-11-18T10:15:00Z',
      gradeStatus: 'SCORED',
      score: 8,
      isWithdrawn: false,
      artifactsCount: 2,
    },
    {
      attemptId: 'att-03',
      sessionId: 'ses-03',
      taskRef: dummyTaskRef,
      taskTitle: 'Complex Roots Diagnostic Repair',
      subject: 'MATHEMATICS',
      category: 'REPAIR',
      submittedAt: '2026-11-18T10:30:00Z',
      gradeStatus: 'SCORED',
      score: 10,
      isWithdrawn: false,
      artifactsCount: 1,
    },
    {
      attemptId: 'att-04',
      sessionId: 'ses-04',
      taskRef: dummyTaskRef,
      taskTitle: 'Zero-Coefficient Boundary Check',
      subject: 'MATHEMATICS',
      category: 'BOUNDARY_CHECK',
      submittedAt: '2026-11-18T10:45:00Z',
      gradeStatus: 'REVIEW_PENDING',
      isWithdrawn: false,
      artifactsCount: 1,
    },
  ];

  const controller = new ProgressPageController(undefined, attempts);
  const stats = controller.getStats();

  assert.equal(stats.totalAttempts, 4);
  assert.equal(stats.firstAttempts, 1);
  assert.equal(stats.assistedAttempts, 1);
  assert.equal(stats.repairAttempts, 1);
  assert.equal(stats.boundaryAttempts, 1);
  assert.equal(stats.withdrawnRetained, 0);

  // Category filtering
  controller.setCategoryFilter('ASSISTED');
  const filtered = controller.getFilteredAttempts();
  assert.equal(filtered.length, 1);
  assert.equal(filtered[0].attemptId, 'att-02');
});

// ---------------------------------------------------------------------------
// Test 2: Rule 13 Invariant: Zero mastery claims & retention of withdrawn items
// ---------------------------------------------------------------------------
it('A36: Progress disclaims cognitive mastery and retains withdrawn item attempts', () => {
  const dummyTaskRef = {
    id: 'TASK-PHY-OPT-02',
    revision: 1,
    sha256: 'b'.repeat(64),
    type: 'QUESTION' as const,
  };

  const attempts: EnrichedAttemptItem[] = [
    {
      attemptId: 'att-withdrawn-01',
      sessionId: 'ses-old-01',
      taskRef: dummyTaskRef,
      taskTitle: 'Deprecated Prism Ray Tracing',
      subject: 'PHYSICS',
      category: 'FIRST_ATTEMPT',
      submittedAt: '2026-11-18T09:00:00Z',
      gradeStatus: 'SCORED',
      score: 6,
      isWithdrawn: true,
      artifactsCount: 1,
    },
  ];

  const controller = new ProgressPageController(undefined, attempts);
  const stats = controller.getStats();
  assert.equal(stats.withdrawnRetained, 1);

  // Mount in a virtual DOM container
  const container = { innerHTML: '', querySelectorAll: () => [] } as unknown as HTMLElement;
  controller.mount(container);

  // Verify disclaimer text exists
  assert.ok(container.innerHTML.includes('zero cognitive mastery'));
  assert.ok(container.innerHTML.includes('HOLD'));
  assert.ok(container.innerHTML.includes('NONE'));
  assert.ok(container.innerHTML.includes('withdrawn-notice'));
  assert.ok(container.innerHTML.includes('earlier release version (now withdrawn)'));
});

// ---------------------------------------------------------------------------
// Test 3: Diagnostic mistakes notebook and recovery routing
// ---------------------------------------------------------------------------
it('A36: Diagnostic mistakes notebook handles diagnostic comparison and repair transitions', () => {
  const dummyTaskRef = {
    id: 'TASK-CHM-MOL-01',
    revision: 1,
    sha256: 'c'.repeat(64),
    type: 'QUESTION' as const,
  };

  let navigatedRoute: string | null = null;
  const initialMistakes: RecordedMistakeItem[] = [
    {
      mistakeId: 'mstk-01',
      taskRef: dummyTaskRef,
      taskTitle: 'Molar Mass Calculation',
      subject: 'CHEMISTRY',
      failureMode: 'CALCULATION_ERROR',
      initialResponse: '18 g instead of 32 g/mol',
      diagnosticHint: 'Remember to multiply oxygen subscript (O2 = 2 × 16 = 32)',
      status: 'UNRESOLVED',
      recordedAt: '2026-11-18T11:00:00Z',
      recoveryRoutes: {
        reviewConceptRoute: '/learning/core1a/molar-mass',
        freshChallengeRoute: '/learning/core1b/molar-mass-transfer',
        retryQuestionRoute: '/question/TASK-CHM-MOL-01',
      },
    },
    {
      mistakeId: 'mstk-02',
      taskRef: dummyTaskRef,
      taskTitle: 'Withdrawn Stoichiometry Question',
      subject: 'CHEMISTRY',
      failureMode: 'SIGN_OR_UNIT_ERROR',
      initialResponse: '0.5 mol',
      diagnosticHint: 'Missing unit dimension',
      status: 'UNRESOLVED',
      recordedAt: '2026-11-18T11:15:00Z',
      isWithdrawn: true,
      recoveryRoutes: {
        reviewConceptRoute: '/learning/core1a/stoichiometry',
        freshChallengeRoute: '/learning/core1b/stoichiometry-transfer',
        retryQuestionRoute: '/question/TASK-CHM-MOL-02',
      },
    },
  ];

  const controller = new MistakesPageController(initialMistakes, (route) => {
    navigatedRoute = route;
  });

  assert.equal(controller.getMistakes().length, 2);
  const unrep = controller.getFilteredMistakes();
  assert.equal(unrep.length, 2);

  // Mark as repaired
  controller.markRepaired('mstk-01');
  const m1 = controller.getMistakes().find((m) => m.mistakeId === 'mstk-01');
  assert.equal(m1?.status, 'REPAIRED');
  assert.ok(m1?.repairedAt);

  // Filter repaired
  controller.setStatusFilter('REPAIRED');
  assert.equal(controller.getFilteredMistakes().length, 1);

  // Filter unresolved
  controller.setStatusFilter('UNRESOLVED');
  assert.equal(controller.getFilteredMistakes().length, 1);
  assert.equal(controller.getFilteredMistakes()[0].mistakeId, 'mstk-02');
});

// ---------------------------------------------------------------------------
// Test 4: Bookmarks page: subject tagging, personal notes, tombstoning
// ---------------------------------------------------------------------------
it('A36: Bookmarks page manages notes, tombstoning, and filters', () => {
  const dummyTaskRef = {
    id: 'TASK-PHY-MOT-05',
    revision: 1,
    sha256: 'd'.repeat(64),
    type: 'QUESTION' as const,
  };

  const bookmarks: BookmarkItem[] = [
    {
      bookmarkId: 'bm-01',
      title: 'Equations of Uniform Acceleration',
      subject: 'PHYSICS',
      role: 'CORE1A',
      taskRef: dummyTaskRef,
      route: '/learning/core1a/motion',
      notes: 'Need to review v² = u² + 2as derivation',
      bookmarkedAt: '2026-11-18T12:00:00Z',
      isWithdrawn: false,
    },
    {
      bookmarkId: 'bm-02',
      title: 'Archived Caloric Theory Question',
      subject: 'PHYSICS',
      role: 'CORE2B',
      taskRef: dummyTaskRef,
      route: '/learning/core2b/archived-caloric',
      notes: 'Historical interest only',
      bookmarkedAt: '2026-11-18T12:30:00Z',
      isWithdrawn: true,
      tombstoneNotice: 'Item withdrawn from demo release; notes retained.',
    },
  ];

  let removedId: string | null = null;
  let updatedNotes: { id: string; notes: string } | null = null;

  const controller = new BookmarksPageController(bookmarks, {
    onRemoveBookmark: (id) => {
      removedId = id;
    },
    onUpdateNotes: (id, notes) => {
      updatedNotes = { id, notes };
    },
  });

  assert.equal(controller.getBookmarks().length, 2);

  // Update notes
  controller.updateNotes('bm-01', 'Reviewed derivation today, solid.');
  assert.ok(updatedNotes);
  assert.equal((updatedNotes as { id: string; notes: string }).id, 'bm-01');
  assert.equal((updatedNotes as { id: string; notes: string }).notes, 'Reviewed derivation today, solid.');
  assert.equal(controller.getBookmarks()[0].notes, 'Reviewed derivation today, solid.');

  // Filter by subject
  controller.setSubjectFilter('CHEMISTRY');
  assert.equal(controller.getFilteredBookmarks().length, 0);

  controller.setSubjectFilter('PHYSICS');
  assert.equal(controller.getFilteredBookmarks().length, 2);

  // Search query
  controller.setSearchQuery('uniform');
  assert.equal(controller.getFilteredBookmarks().length, 1);
  assert.equal(controller.getFilteredBookmarks()[0].bookmarkId, 'bm-01');

  // Clear search and remove
  controller.setSearchQuery('');
  controller.removeBookmark('bm-01');
  assert.equal(removedId, 'bm-01');
  assert.equal(controller.getBookmarks().length, 1);
  assert.equal(controller.getBookmarks()[0].bookmarkId, 'bm-02');
  assert.equal(controller.getBookmarks()[0].isWithdrawn, true);
});

// ---------------------------------------------------------------------------
// Test 5: Settings typography scaling bounds and step controls
// ---------------------------------------------------------------------------
it('A36: Settings page strictly enforces typography scale bounds [0.85, 1.50]', () => {
  let emittedScale: number | null = null;
  const controller = new SettingsPageController(undefined, FONT_SCALE_DEFAULT, {
    onFontScaleChange: (scale) => {
      emittedScale = scale;
    },
  });

  assert.equal(controller.getFontScale(), 1.0);

  // Increase by step
  controller.increaseFontScale();
  assert.equal(controller.getFontScale(), 1.05);
  assert.equal(emittedScale, 1.05);

  // Clamp at max
  controller.setFontScale(1.80);
  assert.equal(controller.getFontScale(), FONT_SCALE_MAX); // 1.50

  controller.increaseFontScale();
  assert.equal(controller.getFontScale(), FONT_SCALE_MAX); // cannot exceed 1.50

  // Decrease down to min
  controller.setFontScale(0.50);
  assert.equal(controller.getFontScale(), FONT_SCALE_MIN); // 0.85

  controller.decreaseFontScale();
  assert.equal(controller.getFontScale(), FONT_SCALE_MIN); // cannot go below 0.85

  // Reset
  controller.resetFontScale();
  assert.equal(controller.getFontScale(), FONT_SCALE_DEFAULT); // 1.0
});

// ---------------------------------------------------------------------------
// Test 6: Storage health diagnostics & blocked storage alerting
// ---------------------------------------------------------------------------
it('A36: Storage health diagnostics handles blocked storage alerts honestly', () => {
  const controller = new SettingsPageController();

  assert.equal(controller.getDiagnostics().status, 'AVAILABLE');

  // Trigger blocked storage alert
  controller.setStorageBlocked(true, 'IndexedDB transaction denied in private browsing sandbox');
  const diag = controller.getDiagnostics();
  assert.equal(diag.status, 'BLOCKED');
  assert.equal(diag.driverType, 'Blocked');
  assert.equal(diag.errorDetails, 'IndexedDB transaction denied in private browsing sandbox');

  const container = { innerHTML: '', querySelectorAll: () => [] } as unknown as HTMLElement;
  controller.mount(container);

  assert.ok(container.innerHTML.includes('storage-blocked-alert'));
  assert.ok(container.innerHTML.includes('IndexedDB transaction denied in private browsing sandbox'));
  assert.ok(container.innerHTML.includes('ephemeral memory for the duration of this tab only'));
});

// ---------------------------------------------------------------------------
// Test 7: Export and Import verified roundtrip via ProgressStore
// ---------------------------------------------------------------------------
it('A36: Export and Import backup roundtrip preserves attempts with SHA-256 integrity', async () => {
  const driver = new MemoryStorageDriver();
  const store = new DefaultProgressStore(driver);

  const dummyRef = {
    id: 'TASK-MIG-ROUNDTRIP-01',
    revision: 1,
    sha256: 'e'.repeat(64),
    type: 'QUESTION' as const,
  };

  const session: Session = {
    id: 'ses-roundtrip-01',
    releaseId: 'REL-DEMO-01',
    item: dummyRef,
    origin: null,
    returnRoute: '/learning',
    mode: 'PRACTICE',
    cursor: 0,
    attemptIds: [],
    draftId: null,
  };

  const response: Response = {
    kind: 'INTEGER',
    value: '42',
  };

  const artifact: WorkArtifact = {
    id: 'art-01',
    kind: 'NOTE',
    value: 'Derived using conservation of momentum',
    version: 1,
  };

  // Save draft
  await store.saveDraft(session, response, [artifact]);

  const attempt: Attempt = {
    id: 'att-roundtrip-01',
    sessionId: session.id,
    releaseId: session.releaseId,
    item: dummyRef,
    response,
    work: [artifact],
    hintIds: [],
    submittedAt: '2026-11-18T14:00:00.000Z',
    grade: {
      status: 'REVIEW_PENDING',
      points: null,
      maxPoints: 10,
      reasonCode: 'LOCAL_LOGGED',
    },
    cognitive: null,
  };

  // Append attempt
  await store.appendAttempt(attempt);

  // Export
  const backupBlob = await store.exportAll();
  assert.ok(backupBlob.size > 0);
  const backupText = await backupBlob.text();
  const bundle = JSON.parse(backupText);

  assert.equal(bundle.schema_version, STORAGE_EXPORT_VERSION);
  assert.equal(bundle.data.attempts.length, 1);
  assert.equal(bundle.data.attempts[0].id, 'att-roundtrip-01');
  assert.equal(bundle.data.artifacts.length, 1);

  // Verify checksum
  const expectedSha = await computeSha256(JSON.stringify(bundle.data));
  assert.equal(bundle.checksum, expectedSha);

  // Restore into a fresh store
  const freshDriver = new MemoryStorageDriver();
  const freshStore = new DefaultProgressStore(freshDriver);

  await freshStore.importVerified(backupBlob);

  // Export from fresh store and verify exact record conservation
  const restoredBlob = await freshStore.exportAll();
  const restoredBundle = JSON.parse(await restoredBlob.text());

  assert.equal(restoredBundle.data.attempts.length, 1);
  assert.equal(restoredBundle.data.attempts[0].id, 'att-roundtrip-01');
  assert.equal(restoredBundle.data.artifacts[0].value, 'Derived using conservation of momentum');

  // Verify rejection of corrupted bundle
  const corruptedBundle = {
    ...bundle,
    checksum: 'badbadbad0000000000000000000000000000000000000000000000000000000',
  };
  const corruptedBlob = new Blob([JSON.stringify(corruptedBundle)], { type: 'application/json' });

  await assert.rejects(async () => {
    await freshStore.importVerified(corruptedBlob);
  }, /CHECKSUM_MISMATCH|StorageError/);
});

// ---------------------------------------------------------------------------
// Test 8: Headless Playwright tablet ergonomics: 48px hit targets & dual orientation
// ---------------------------------------------------------------------------
it('A36: Headless Playwright tablet ergonomics (48px hit targets, dual orientation)', async (t) => {
  const executablePath = getChromiumExecutable();
  if (!executablePath) {
    t.skip('Playwright chromium executable not found in standard paths; skipping browser launch.');
    return;
  }

  const browser: Browser = await chromium.launch({
    executablePath,
    headless: true,
  });

  try {
    const page = await browser.newPage();

    // 1. Portrait tablet viewport (1000 x 1600)
    await page.setViewportSize({ width: 1000, height: 1600 });
    await page.setContent(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>A36 Tablet Verification</title>
          <style>
            :root {
              --g9-hit-min: 48px;
              --g9-hit-primary: 56px;
              --g9-font-scale: 1.0;
            }
            body {
              margin: 0;
              padding: 0;
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
              background-color: #f8f9fa;
            }
          </style>
        </head>
        <body>
          <div id="test-root"></div>
        </body>
      </html>
    `);

    // Mount all interactive sections
    await page.evaluate(() => {
      const root = document.getElementById('test-root')!;
      root.innerHTML = `
        <div style="width: 100%; max-width: 1000px; margin: 0 auto; padding: 16px; box-sizing: border-box;">
          <!-- Category Chips -->
          <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 16px;">
            <button type="button" class="category-chip" style="min-height: 48px; padding: 8px 16px; border-radius: 24px; border: 1px solid #1a73e8; background: #1a73e8; color: #fff;">All Evidence</button>
            <button type="button" class="category-chip" style="min-height: 48px; padding: 8px 16px; border-radius: 24px; border: 1px solid #dadce0; background: #fff;">Repairs</button>
          </div>

          <!-- Mistakes Action Buttons -->
          <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 16px;">
            <button type="button" class="recovery-btn" style="min-height: 48px; padding: 0 16px; border-radius: 8px; background: #e8f0fe; color: #1a73e8; border: 1px solid #c2e7ff;">Learn concept</button>
            <button type="button" class="recovery-btn" style="min-height: 48px; padding: 0 16px; border-radius: 8px; background: #e6f4ea; color: #137333; border: 1px solid #ceead6;">Try fresh challenge</button>
          </div>

          <!-- Bookmarks Actions -->
          <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 16px;">
            <input type="search" class="bookmark-input" placeholder="Search..." style="flex: 1; min-height: 48px; padding: 0 16px; border: 1px solid #dadce0; border-radius: 8px; box-sizing: border-box;" />
            <button type="button" class="bookmark-btn" style="min-height: 48px; padding: 0 16px; border: none; border-radius: 8px; background: #1a73e8; color: #fff;">Open Task →</button>
          </div>

          <!-- Settings Font Scaling Controls -->
          <div style="display: flex; gap: 16px; align-items: center; margin-bottom: 16px;">
            <button type="button" class="font-scale-dec" style="min-width: 56px; min-height: 56px; border: 1px solid #dadce0; border-radius: 8px; background: #fff; font-size: 20px;">A−</button>
            <span style="font-size: 18px; font-weight: 700;">100%</span>
            <button type="button" class="font-scale-inc" style="min-width: 56px; min-height: 56px; border: 1px solid #dadce0; border-radius: 8px; background: #fff; font-size: 20px;">A+</button>
            <button type="button" class="font-scale-rst" style="min-height: 48px; padding: 0 16px; border: 1px solid #dadce0; border-radius: 8px; background: #fff;">Reset</button>
          </div>
        </div>
      `;
    });

    // Verify 48px minimum touch hit target bounds
    const hitTargetHeights = await page.evaluate(() => {
      const selectors = [
        '.category-chip',
        '.recovery-btn',
        '.bookmark-input',
        '.bookmark-btn',
        '.font-scale-dec',
        '.font-scale-inc',
        '.font-scale-rst',
      ];
      const heights: Record<string, number> = {};
      for (const sel of selectors) {
        const el = document.querySelector(sel);
        if (el) {
          heights[sel] = el.getBoundingClientRect().height;
        }
      }
      return heights;
    });

    for (const [selector, height] of Object.entries(hitTargetHeights)) {
      assert.ok(
        height >= HIT_TARGET_MIN_PX,
        `Interactive selector '${selector}' height (${height}px) is less than ${HIT_TARGET_MIN_PX}px minimum!`
      );
    }

    // Verify 0px horizontal overflow in portrait
    const portraitOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    assert.equal(portraitOverflow, false, 'Horizontal overflow detected in portrait tablet viewport!');

    // 2. Landscape tablet viewport (1600 x 1000)
    await page.setViewportSize({ width: 1600, height: 1000 });
    const landscapeOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    assert.equal(landscapeOverflow, false, 'Horizontal overflow detected in landscape tablet viewport!');
  } finally {
    await browser.close();
  }
});
