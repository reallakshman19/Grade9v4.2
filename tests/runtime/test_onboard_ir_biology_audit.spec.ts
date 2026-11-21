/**
 * tests/runtime/test_onboard_ir_biology_audit.spec.ts
 * Independent Review (IR) Source-Backed Verification for NSEJS Biology Port.
 *
 * Verifies against immutable custody baseline:
 * - Custody Tree: D:\CodeD\custody\Grade9v4.1\nsejs\biology
 * - Custody Data: D:\CodeD\custody\Grade9v4.1\nsejs\data\biology-core2-candidates.v1.json (119 Qs)
 * - Fault N09 Answer Isolation: keyState === 'WITHHELD_CLIENT_SIDE_FAULT_N09'
 * - Multi-Index Querying: living_world, life_processes, coordination, genetics, environment
 * - Subject and Topic Descriptors: BIOLOGY_SUBJECT_DETAIL, BIO_*_TOPIC
 * - Zero iframe dependency across all ported assets
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

import {
  UNIFIED_QUESTION_DATABASE,
  type UnifiedQuestionEntry,
} from '../../web/runtime/unified-question-database.ts';
import { CANONICAL_UNIFIED_QUESTIONS } from '../../web/data/unified-questions.generated.ts';
import { V41_BIOLOGY_QUESTIONS } from '../../web/data/v41-biology-questions.generated.ts';
import { BIOLOGY_SUBJECT_DETAIL } from '../../web/pages/subject.ts';
import {
  BIO_LIVING_WORLD_TOPIC,
  BIO_LIFE_PROCESSES_TOPIC,
  BIO_COORDINATION_TOPIC,
  BIO_GENETICS_TOPIC,
  BIO_ENVIRONMENT_TOPIC,
} from '../../web/pages/topic.ts';
import { DEFAULT_APP_REGISTRY } from '../../web/runtime/registry/index.ts';

describe('OnBoard-IR Audit: NSEJS Biology Adoption Parity', () => {

  it('IR-AUDIT-01: Baseline Custody Parity — 119 candidate questions ported', () => {
    assert.equal(V41_BIOLOGY_QUESTIONS.length, 119, 'Must port exactly 119 questions from v4.1 custody');
    
    // Check all IDs match the BIO-NSEJS prefix or canonical format
    for (const q of V41_BIOLOGY_QUESTIONS) {
      assert(q.id && q.id.length > 0, `Question must have non-empty ID`);
      assert.equal(q.subjectCode, 'BIO', `Question ${q.id} must have subjectCode BIO`);
      assert.equal(q.subject, 'Biology', `Question ${q.id} must have subject Biology`);
      assert.equal(q.exam, 'NSEJS', `Question ${q.id} must be tagged NSEJS`);
    }
  });

  it('IR-AUDIT-02: Fault N09 Answer Isolation Verification', () => {
    for (const q of V41_BIOLOGY_QUESTIONS) {
      assert.equal(
        q.keyState,
        'WITHHELD_CLIENT_SIDE_FAULT_N09',
        `Question ${q.id} must enforce Fault N09 client-side key withholding`
      );
      assert.equal(
        q.correctKey,
        'WITHHELD_CLIENT_SIDE_FAULT_N09',
        `Question ${q.id} must not leak raw official answer in correctKey`
      );
      assert(
        q.hints && q.hints.length >= 2,
        `Question ${q.id} must contain pedagogical hint ladder for formative exploration`
      );
      assert(
        q.steps && q.steps.length >= 1,
        `Question ${q.id} must provide derivation reasoning steps`
      );
    }
  });

  it('IR-AUDIT-03: Topic Stratification across 5 Canonical Biology Domains', () => {
    const living = V41_BIOLOGY_QUESTIONS.filter(q => q.topicCode === 'LIVING_WORLD');
    const life = V41_BIOLOGY_QUESTIONS.filter(q => q.topicCode === 'LIFE_PROCESSES');
    const coord = V41_BIOLOGY_QUESTIONS.filter(q => q.topicCode === 'COORDINATION');
    const genet = V41_BIOLOGY_QUESTIONS.filter(q => q.topicCode === 'GENETICS');
    const env = V41_BIOLOGY_QUESTIONS.filter(q => q.topicCode === 'ENVIRONMENT');

    assert.equal(living.length, 36, 'Living World & Virology must have 36 questions');
    assert.equal(life.length, 25, 'Life Processes & Nephron Physiology must have 25 questions');
    assert.equal(coord.length, 15, 'Control & Coordination must have 15 questions');
    assert.equal(genet.length, 23, 'Genetics & Heredity must have 23 questions');
    assert.equal(env.length, 20, 'Ecology & Environment must have 20 questions');
    assert.equal(living.length + life.length + coord.length + genet.length + env.length, 119);
  });

  it('IR-AUDIT-04: Unified Question Database Multi-Index Integration', () => {
    assert(UNIFIED_QUESTION_DATABASE.size() >= 725, 'Database must be pre-loaded with unified corpus');

    // Query by Subject BIO
    const bioResult = UNIFIED_QUESTION_DATABASE.query({ subject: 'BIO', pageSize: 200 });
    assert(bioResult.totalCount >= 119, `Database must index all 119 biology questions, got ${bioResult.totalCount}`);

    // Query by Topic
    const geneticsResult = UNIFIED_QUESTION_DATABASE.query({ topic: 'GENETICS', pageSize: 50 });
    assert.equal(geneticsResult.totalCount, 23, 'Must query exactly 23 Genetics questions');

    const livingResult = UNIFIED_QUESTION_DATABASE.query({ topic: 'LIVING_WORLD', pageSize: 50 });
    assert.equal(livingResult.totalCount, 36, 'Must query exactly 36 Living World questions');
  });

  it('IR-AUDIT-05: Subject & Topic Descriptors Adherence', () => {
    assert.equal(BIOLOGY_SUBJECT_DETAIL.id, 'biology');
    assert.equal(BIOLOGY_SUBJECT_DETAIL.status, 'AVAILABLE');
    assert.equal(BIOLOGY_SUBJECT_DETAIL.academicAdmission, 'HOLD');
    assert.equal(BIOLOGY_SUBJECT_DETAIL.topics.length, 5);

    assert.equal(BIO_LIVING_WORLD_TOPIC.id, 'living_world');
    assert.equal(BIO_LIFE_PROCESSES_TOPIC.id, 'life_processes');
    assert.equal(BIO_COORDINATION_TOPIC.id, 'coordination');
    assert.equal(BIO_GENETICS_TOPIC.id, 'genetics');
    assert.equal(BIO_ENVIRONMENT_TOPIC.id, 'environment');
  });

  it('IR-AUDIT-06: App Registry Biology Registration', () => {
    const regSubj = DEFAULT_APP_REGISTRY.subjects.find(s => s.id === 'subject:biology');
    assert(regSubj !== undefined, 'Registry must contain subject:biology');
    assert.equal(regSubj.availability, 'AVAILABLE');
    assert.equal(regSubj.authorityStatus.academicAdmission, 'HOLD');
    assert.equal(regSubj.authorityStatus.technicalCheck, 'PASS');
    assert.equal(regSubj.authorityStatus.releaseEligibility, 'ELIGIBLE');
    assert.equal(regSubj.topicIds.length, 5);
  });

  it('IR-AUDIT-07: Static Assets & Standalone Files Existence & Zero-Iframe Verification', () => {
    const filesToCheck = [
      'web/biology/index.html',
      'web/biology/authored-practice.html',
      'web/biology/question-bank.html',
      'web/biology/core1/index.html',
      'web/biology/core1/bio-viral-genetics-d3-r1/index.html',
      'web/biology/core1/bio-immunology-defense-d3-r1/index.html',
      'web/biology/core1/bio-genetics-coordination-r1/index.html',
      'web/biology/assets/fig_bio_complementary_genes.svg',
      'web/biology/assets/fig_bio_nephron_filtration.svg',
      'web/biology/assets/fig_bio_trophic_pyramid.svg',
      'web/biology/assets/fig_bio_water_potential.svg',
      'web/biology/js/core2-biology-reader.js',
      'web/biology/data/biology-core2-candidates.v1.json',
    ];

    for (const f of filesToCheck) {
      assert(existsSync(resolve(f)), `Required biology file must exist: ${f}`);
    }

    // Zero iframes verification in standalone biology pages
    const htmlFiles = filesToCheck.filter(f => f.endsWith('.html'));
    for (const htmlPath of htmlFiles) {
      const content = readFileSync(resolve(htmlPath), 'utf-8');
      assert(!content.includes('<iframe'), `${htmlPath} must not contain any <iframe> element`);
      assert(
        content.includes('Academic Status: HOLD') || content.includes('Rule 13'),
        `${htmlPath} must feature Rule 13 / Section 19 academic hold notice`
      );
    }
  });

});
