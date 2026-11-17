// Unit and integration tests for Loader and Router subsystems (Workpack A15).
// Tests digest verification, exact revision resolution, base-aware routing, deep linking, and safe returns.

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { ManifestLoader, LoaderError, computeSha256 } from '../../web/runtime/loader.ts';
import { Router } from '../../web/app/router.ts';
import type { ReleaseManifest } from '../../web/runtime/loader.ts';
import type { Ref } from '../../web/runtime/types.ts';

function makeTestManifest(digest: string = 'a'.repeat(64)): ReleaseManifest {
  return {
    schema_version: 'g9-release-projection/1.0',
    release_id: 'rel:synthetic:demo:2026',
    target_mode: 'DEMO',
    demo_banner: true,
    academic_admission: 'HOLD',
    production_release: 'NONE',
    compiled_at: '2026-11-17T00:00:00Z',
    total_objects: 3,
    release_digest: digest,
    projections: {
      learner_precommit: {
        'que:physics:wpe:01': {
          id: 'que:physics:wpe:01',
          revision: 1,
          stem: 'Calculate the net work done by a constant 10N force over 5m.',
          has_solution: false,
        },
      },
      learner_postcommit: {
        'que:physics:wpe:01': {
          id: 'que:physics:wpe:01',
          revision: 1,
          stem: 'Calculate the net work done by a constant 10N force over 5m.',
          solution: 'W = F * d = 10 * 5 = 50 J',
          has_solution: true,
        },
      },
      search_index: [
        {
          id: 'que:physics:wpe:01',
          title: 'Constant Force Work Calculation',
          topic: 'topic:physics:wpe',
        },
      ],
      assessment_contracts: {
        'que:physics:wpe:01': {
          numeric_tolerance: 0.01,
          expected_unit: 'J',
        },
      },
    },
    visibility_matrix: {
      predict_stage_allowed: ['VIEW_STIMULUS', 'EDIT_WORK'],
      attempt_stage_allowed: ['VIEW_STIMULUS', 'EDIT_WORK', 'H1'],
    },
  };
}

describe('ManifestLoader', () => {
  it('loads and validates a valid release manifest from string data', async () => {
    const loader = new ManifestLoader();
    const digest = 'c'.repeat(64);
    const manifest = makeTestManifest(digest);
    const loaded = await loader.loadFromData(JSON.stringify(manifest), digest);

    assert.equal(loaded.release_id, 'rel:synthetic:demo:2026');
    assert.equal(loaded.release_digest, digest);
    assert.equal(loader.getCached('rel:synthetic:demo:2026')?.release_id, 'rel:synthetic:demo:2026');
  });

  it('rejects stale or mismatched manifest hash with STALE_MANIFEST_HASH', async () => {
    const loader = new ManifestLoader();
    const manifest = makeTestManifest('e'.repeat(64));
    const raw = JSON.stringify(manifest);

    await assert.rejects(
      async () => {
        await loader.loadFromData(raw, 'f'.repeat(64));
      },
      (err: unknown) => {
        assert(err instanceof LoaderError);
        assert.equal(err.code, 'STALE_MANIFEST_HASH');
        return true;
      }
    );
  });

  it('rejects malformed JSON with MALFORMED_PROJECTION', async () => {
    const loader = new ManifestLoader();
    await assert.rejects(
      async () => {
        await loader.loadFromData('{ invalid json ...');
      },
      (err: unknown) => {
        assert(err instanceof LoaderError);
        assert.equal(err.code, 'MALFORMED_PROJECTION');
        return true;
      }
    );
  });

  it('rejects manifest missing mandatory metadata fields', async () => {
    const loader = new ManifestLoader();
    const invalidManifest = { target_mode: 'DEMO' };
    await assert.rejects(
      async () => {
        await loader.loadFromData(JSON.stringify(invalidManifest));
      },
      (err: unknown) => {
        assert(err instanceof LoaderError);
        assert.equal(err.code, 'MALFORMED_PROJECTION');
        return true;
      }
    );
  });

  it('resolves item in precommit mode without solution leaks', () => {
    const loader = new ManifestLoader();
    const manifest = makeTestManifest();
    const ref: Ref = {
      type: 'QUESTION',
      id: 'que:physics:wpe:01',
      revision: 1,
      sha256: 'a'.repeat(64),
    };

    const item = loader.resolveItem<{ stem: string; has_solution: boolean; solution?: string }>(
      manifest,
      ref,
      'PRECOMMIT'
    );
    assert.equal(item.has_solution, false);
    assert.equal(item.solution, undefined);
  });

  it('resolves item in postcommit mode with verified solution', () => {
    const loader = new ManifestLoader();
    const manifest = makeTestManifest();
    const ref: Ref = {
      type: 'QUESTION',
      id: 'que:physics:wpe:01',
      revision: 1,
      sha256: 'a'.repeat(64),
    };

    const item = loader.resolveItem<{ stem: string; has_solution: boolean; solution: string }>(
      manifest,
      ref,
      'POSTCOMMIT'
    );
    assert.equal(item.has_solution, true);
    assert.ok(item.solution.includes('50 J'));
  });

  it('rejects missing item with ITEM_NOT_FOUND', () => {
    const loader = new ManifestLoader();
    const manifest = makeTestManifest();
    const ref: Ref = {
      type: 'QUESTION',
      id: 'que:unknown:99',
      revision: 1,
      sha256: 'a'.repeat(64),
    };

    assert.throws(
      () => {
        loader.resolveItem(manifest, ref, 'PRECOMMIT');
      },
      (err: unknown) => {
        assert(err instanceof LoaderError);
        assert.equal(err.code, 'ITEM_NOT_FOUND');
        return true;
      }
    );
  });

  it('rejects item revision mismatch with INVALID_REVISION', () => {
    const loader = new ManifestLoader();
    const manifest = makeTestManifest();
    const ref: Ref = {
      type: 'QUESTION',
      id: 'que:physics:wpe:01',
      revision: 2, // Requested rev 2, manifest only has rev 1
      sha256: 'a'.repeat(64),
    };

    assert.throws(
      () => {
        loader.resolveItem(manifest, ref, 'PRECOMMIT');
      },
      (err: unknown) => {
        assert(err instanceof LoaderError);
        assert.equal(err.code, 'INVALID_REVISION');
        return true;
      }
    );
  });

  it('supports cache clearing', async () => {
    const loader = new ManifestLoader();
    const manifest = makeTestManifest();
    await loader.loadFromData(JSON.stringify(manifest));
    assert.ok(loader.getCached('rel:synthetic:demo:2026'));

    loader.clearCache('rel:synthetic:demo:2026');
    assert.equal(loader.getCached('rel:synthetic:demo:2026'), null);
  });
});

describe('Router', () => {
  it('normalizes basePaths and strips them cleanly', () => {
    const router1 = new Router({ basePath: '/Grade9v4.2/' });
    assert.equal(router1.basePath, '/Grade9v4.2');
    assert.equal(router1.stripBasePath('/Grade9v4.2/subject/physics'), '/subject/physics');

    const router2 = new Router({ basePath: 'subpath' });
    assert.equal(router2.basePath, '/subpath');
    assert.equal(router2.stripBasePath('/subpath/'), '/');
  });

  it('matches Home route', () => {
    const router = new Router({ basePath: '/Grade9v4.2' });
    const match = router.match('/Grade9v4.2/');
    assert.equal(match.type, 'HOME');
    assert.equal(match.path, '/');
  });

  it('matches Subject route and extracts parameters', () => {
    const router = new Router({ basePath: '/Grade9v4.2' });
    const match = router.match('/Grade9v4.2/subject/physics');
    assert.equal(match.type, 'SUBJECT');
    assert.equal(match.params.subjectId, 'physics');
  });

  it('matches Topic route and extracts multiple parameters', () => {
    const router = new Router();
    const match = router.match('/subject/physics/topic/wpe');
    assert.equal(match.type, 'TOPIC');
    assert.equal(match.params.subjectId, 'physics');
    assert.equal(match.params.topicId, 'wpe');
  });

  it('matches Question route with encoded identifiers', () => {
    const router = new Router();
    const match = router.match('/question/que%3Aphysics%3Awpe%3A01');
    assert.equal(match.type, 'QUESTION');
    assert.equal(match.params.questionId, 'que:physics:wpe:01');
  });

  it('matches Role route with Core role and resource ID', () => {
    const router = new Router();
    const match = router.match('/role/CORE1A/res%3Aphysics%3A01');
    assert.equal(match.type, 'ROLE');
    assert.equal(match.params.coreRole, 'CORE1A');
    assert.equal(match.params.resourceId, 'res:physics:01');
  });

  it('matches Search route and parses query parameters', () => {
    const router = new Router();
    const match = router.match('/search?q=kinetic+energy&mode=quick#results');
    assert.equal(match.type, 'SEARCH');
    assert.equal(match.query.q, 'kinetic energy');
    assert.equal(match.query.mode, 'quick');
    assert.equal(match.hash, 'results');
  });

  it('matches Exam paper route', () => {
    const router = new Router();
    const match = router.match('/exam/paper-2026-physics');
    assert.equal(match.type, 'EXAM');
    assert.equal(match.params.paperId, 'paper-2026-physics');
  });

  it('returns NOT_FOUND for unknown routes', () => {
    const router = new Router();
    const match = router.match('/unknown/deep/invalid/route');
    assert.equal(match.type, 'NOT_FOUND');
  });

  it('generates base-aware URLs with toHref', () => {
    const router = new Router({ basePath: '/Grade9v4.2' });
    assert.equal(
      router.toHref('/subject/physics', { view: 'grid' }),
      '/Grade9v4.2/subject/physics?view=grid'
    );

    const hashRouter = new Router({ basePath: '/Grade9v4.2', useHash: true });
    assert.equal(
      hashRouter.toHref('/subject/physics'),
      '/Grade9v4.2/#/subject/physics'
    );
  });

  it('supports safe return navigation with back() and fallback', () => {
    const router = new Router();
    router.navigate('/subject/physics');
    router.navigate('/subject/physics/topic/wpe');
    router.navigate('/question/que:01');

    // Return to topic
    const prev1 = router.back('/subject/physics');
    assert.equal(prev1.type, 'TOPIC');
    assert.equal(prev1.params.topicId, 'wpe');

    // Return to subject
    const prev2 = router.back('/');
    assert.equal(prev2.type, 'SUBJECT');

    // Return to home
    const prev3 = router.back('/');
    assert.equal(prev3.type, 'HOME');

    // Empty stack falls back safely without error
    const fallback = router.back('/subject/physics');
    assert.equal(fallback.type, 'SUBJECT');
  });

  it('supports listener subscription and unsubscription', () => {
    const router = new Router();
    let callCount = 0;
    let lastPath = '';

    const unsubscribe = router.subscribe((match) => {
      callCount += 1;
      lastPath = match.path;
    });

    router.navigate('/subject/chemistry');
    assert.equal(callCount, 1);
    assert.equal(lastPath, '/subject/chemistry');

    unsubscribe();
    router.navigate('/subject/mathematics');
    assert.equal(callCount, 1); // Not called after unsubscribe
  });
});
