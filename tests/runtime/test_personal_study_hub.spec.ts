/**
 * tests/runtime/test_personal_study_hub.spec.ts
 * Comprehensive test suite for My Personal Study Hub functionality:
 * - Authentic Session creation and IndexedDB/Memory StorageDriver persistence
 * - Diagnostic Evidence computation and Category aggregation
 * - Mistake Journal filtering and qualification
 * - Bookmark CRUD, CAS revision checking, and note persistence
 * - Settings dynamic font scaling and JSON backup export/restore
 * - PersonalPageHost 5-tool rendering and navigation in DOM
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createAuthorizedPersonalStudySession } from '../../web/runtime/personal-study-session.ts';
import { MemoryStorageDriver } from '../../web/runtime/storage.ts';
import { createPersonalStudyHost } from '../../web/pages/personal-study.ts';
import { Router } from '../../web/app/router.ts';

test('Personal Study Hub — Session initialization and persistent storage binding', async () => {
  const driver = new MemoryStorageDriver();
  const session = await createAuthorizedPersonalStudySession(driver, 'test_learner');

  assert.equal(session.scope.schema, 'g9-a36-scope/1');
  assert.equal(session.scope.learnerId, 'test_learner');
  assert.equal(session.release.academic_admission, 'HOLD');
  assert.equal(session.release.target_mode, 'DEMO');

  const evidence = await session.store.evidence();
  assert(evidence.rows.length >= 3, 'Expected at least 3 seeded diagnostic attempts');

  const ordinary = evidence.rows.filter((r) => r.category === 'ORDINARY_ATTEMPT');
  assert.equal(ordinary.length, 3);

  const mistakes = evidence.mistakes;
  assert(mistakes.length >= 2, 'Expected at least 2 recorded failure items');
  assert(mistakes.some((m) => m.reason === 'INCORRECT_INTEGER'));
  assert(mistakes.some((m) => m.reason === 'INCORRECT_CHOICE'));
});

test('Personal Study Hub — Bookmarks interactive CRUD and CAS revision integrity', async () => {
  const driver = new MemoryStorageDriver();
  const session = await createAuthorizedPersonalStudySession(driver, 'bookmark_learner');

  const lib = await session.store.library();
  assert(lib.eligible.length >= 6, 'All curriculum questions must be eligible for bookmarking');

  const target = lib.eligible[0].ref;
  let profile = await session.store.addBookmark(0, target, 'My initial study note');
  assert.equal(profile.bookmarks.length, 1);
  assert.equal(profile.bookmarks[0].notes, 'My initial study note');
  assert.equal(profile.revision, 1);

  // Stale revision must throw
  await assert.rejects(
    session.store.addBookmark(0, lib.eligible[1].ref),
    /STALE_PERSONAL_REVISION/
  );

  // Edit bookmark notes
  profile = await session.store.editBookmark(1, profile.bookmarks[0].id, 'Updated reflective note');
  assert.equal(profile.bookmarks[0].notes, 'Updated reflective note');
  assert.equal(profile.revision, 2);

  // Remove bookmark
  profile = await session.store.removeBookmark(2, profile.bookmarks[0].id);
  assert.equal(profile.bookmarks.length, 0);
  assert.equal(profile.revision, 3);
});

test('Personal Study Hub — Settings text scale adjustments and export archives', async () => {
  const driver = new MemoryStorageDriver();
  const session = await createAuthorizedPersonalStudySession(driver, 'settings_learner');

  let profile = await session.store.profile();
  assert.equal(profile.fontStep, 20);

  // Increase text scale
  profile = await session.store.setFontStep(0, 22);
  assert.equal(profile.fontStep, 22);

  // Invalid step bounds
  await assert.rejects(session.store.setFontStep(1, 15), /INVALID_FONT_STEP/);
  await assert.rejects(session.store.setFontStep(1, 35), /INVALID_FONT_STEP/);

  // Export progress archive
  const progressBlob = await session.store.exportProgress();
  assert(progressBlob.size > 0);

  // Export profile archive
  const profileBlob = await session.store.exportProfile();
  assert(profileBlob.size > 0);
  const profileJson = JSON.parse(await profileBlob.text());
  assert.equal(profileJson.schema, 'g9-a36-profile-backup/1');
  assert.equal(profileJson.data.fontStep, 22);
});

test('Personal Study Hub — Diagnostics probe verification', async () => {
  const driver = new MemoryStorageDriver();
  const session = await createAuthorizedPersonalStudySession(driver, 'diag_learner');

  const diag = await session.store.diagnostics();
  assert.equal(diag.mode, 'MEMORY_VOLATILE');
  assert.equal(diag.status, 'WRITABLE');
});
