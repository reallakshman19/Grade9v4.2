import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { Core1OrientationPageController, createDefaultWpeOrientationProjection } from '../../web/pages/orientation.ts';
import { parseOrientation, CORE1_ORIENTATION_BLUEPRINT_ID } from '../../web/journeys/core1.ts';
import type { Ref } from '../../web/runtime/types.ts';

describe('Gate P5-G6: Core 1 Reading Orientation & Projection Parsing', () => {
  const sourceRef: Ref = {
    type: 'PRESENTATION',
    id: 'presentation:wpe-orientation',
    revision: 1,
    sha256: 'a'.repeat(64),
  };

  it('validates canonical WPE orientation projection with parseOrientation()', () => {
    const raw = JSON.stringify({
      blueprint: CORE1_ORIENTATION_BLUEPRINT_ID,
      source: sourceRef,
      topicId: 'topic:wpe',
      blocks: {
        identity_scope: 'WPE Scope',
        learner_metadata: 'Grade 9 Foundation',
        objects_conventions: 'Conventions',
        canonical_representation: 'Representations',
        governing_relations: 'Relations',
        compact_anchor: 'Anchors',
        hard_transition_map: 'Transitions',
        exclusions_extensions: 'Exclusions',
        orientation_closure: 'Closure',
      },
    });

    const projection = parseOrientation(raw, sourceRef);
    assert(projection);
    assert.equal(projection.blueprint, CORE1_ORIENTATION_BLUEPRINT_ID);
    assert.equal(projection.topicId, 'topic:wpe');
    assert.equal(Object.keys(projection.blocks).length, 9);
  });

  it('fails closed when orientation projection is missing required blocks', () => {
    const invalidRaw = JSON.stringify({
      blueprint: CORE1_ORIENTATION_BLUEPRINT_ID,
      source: sourceRef,
      topicId: 'topic:wpe',
      blocks: {
        identity_scope: 'Only one block',
      },
    });

    const projection = parseOrientation(invalidRaw, sourceRef);
    assert.equal(projection, null);
  });

  it('renders all 7 accepted blocks under orientation slot and 2 blocks under identity slot', () => {
    const controller = new Core1OrientationPageController();
    const html = controller.render();

    // Check slot identity contains scope and metadata
    assert.match(html, /data-slot="identity"/);
    assert.match(html, /Work, Power, and Energy: Fundamental Mechanical Relations/);
    assert.match(html, /Grade 9 Foundation · Core 1 Reading Orientation/);

    // Check slot orientation contains all 7 accepted blocks
    assert.match(html, /data-slot="orientation"/);
    assert.match(html, /data-block="objects_conventions"/);
    assert.match(html, /data-block="canonical_representation"/);
    assert.match(html, /data-block="governing_relations"/);
    assert.match(html, /data-block="compact_anchor"/);
    assert.match(html, /data-block="hard_transition_map"/);
    assert.match(html, /data-block="exclusions_extensions"/);
    assert.match(html, /data-block="orientation_closure"/);
  });

  it('preserves exact bidirectional return route', () => {
    const returnRoute = '#/subject/physics/topic/wpe/learn-try';
    const controller = new Core1OrientationPageController({ returnRoute });
    assert.equal(controller.getReturnRoute(), returnRoute);
  });
});
