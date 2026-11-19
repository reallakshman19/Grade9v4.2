/**
 * tests/browser/ink.spec.ts
 * A26 — Stylus, work artifact workspace, and ink specification tests.
 *
 * Verifies:
 * - Pointer events drawing lifecycle
 * - Fault N19: pointer cancel mid-stroke discards buffer without corrupting completed strokes
 * - Undo and redo history tracking
 * - Eraser and pan tool modes
 * - Typed alternative text support
 * - Fault N18: orientation switch preservation (draft identical across rotation)
 * - Fault N27: virtual keyboard occlusion defense (scroll margin keeping submit reachable)
 * - Artifact export/import roundtrip with zero data loss
 * - Hit target minimum size (48px)
 *
 * No academic approval inferred from software validation.
 */

import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

import {
  createInkEngine,
  InkEngine,
} from '../../web/runtime/ink.ts';

import {
  createScratchpad,
  ScratchpadController,
} from '../../web/components/workspace/index.ts';

// ---------------------------------------------------------------------------
// Pointer Events Lifecycle & Stroke Creation
// ---------------------------------------------------------------------------

describe('Ink Engine — Pointer Events & Stroke Lifecycle', () => {
  let ink: InkEngine;

  beforeEach(() => {
    ink = createInkEngine(800, 600);
  });

  it('draws a complete stroke from pointerDown to pointerUp', () => {
    assert.equal(ink.getStrokes().length, 0);

    ink.pointerDown(100, 100, 0.6);
    assert.equal(ink.isDrawing(), true);

    ink.pointerMove(120, 110, 0.7);
    ink.pointerMove(140, 120, 0.8);

    const completed = ink.pointerUp();
    assert.equal(completed, true);
    assert.equal(ink.isDrawing(), false);
    assert.equal(ink.getStrokes().length, 1);

    const stroke = ink.getStrokes()[0];
    assert.equal(stroke.points.length, 3);
    assert.equal(stroke.tool, 'pen');
    assert.equal(stroke.color, '#000000');
  });

  // Fault N19: pointer cancel cleanly discards buffer without corrupting completed strokes
  it('Fault N19: pointerCancel discards in-progress buffer and leaves completed strokes intact', () => {
    // 1. Draw a valid completed stroke
    ink.pointerDown(50, 50);
    ink.pointerMove(60, 60);
    ink.pointerUp();
    assert.equal(ink.getStrokes().length, 1);

    // 2. Start a second stroke, then cancel it
    ink.pointerDown(200, 200);
    ink.pointerMove(210, 210);
    ink.pointerCancel(); // Gestural interrupt or palm rejection

    // 3. Verify in-progress buffer is discarded and existing stroke is uncorrupted
    assert.equal(ink.isDrawing(), false);
    assert.equal(ink.getInProgressPoints().length, 0);
    assert.equal(ink.getStrokes().length, 1);
    assert.equal(ink.getStrokes()[0].points[0].x, 50/800);
  });
});

// ---------------------------------------------------------------------------
// Undo, Redo & Eraser
// ---------------------------------------------------------------------------

describe('Ink Engine — Undo, Redo & Eraser', () => {
  let ink: InkEngine;

  beforeEach(() => {
    ink = createInkEngine();
    // Stroke 1
    ink.pointerDown(10, 10);
    ink.pointerMove(20, 20);
    ink.pointerUp();

    // Stroke 2
    ink.pointerDown(100, 100);
    ink.pointerMove(110, 110);
    ink.pointerUp();
  });

  it('undoes and redoes strokes', () => {
    assert.equal(ink.getStrokes().length, 2);
    assert.equal(ink.canUndo(), true);

    ink.undo();
    assert.equal(ink.getStrokes().length, 1);
    assert.equal(ink.canRedo(), true);

    ink.redo();
    assert.equal(ink.getStrokes().length, 2);
  });

  it('erases stroke intersecting eraser radius', () => {
    ink.setTool('eraser');
    ink.pointerDown(15, 15); // Near stroke 1 (10, 10 -> 20, 20)
    ink.pointerUp();

    // Stroke 1 erased; stroke 2 remains
    assert.equal(ink.getStrokes().length, 1);
    assert.equal(ink.getStrokes()[0].points[0].x, 100/800);
  });
});

// ---------------------------------------------------------------------------
// Pan, Zoom & Viewport
// ---------------------------------------------------------------------------

describe('Ink Engine — Pan and Zoom', () => {
  it('pan mode adjusts viewport offset without adding ink strokes', () => {
    const ink = createInkEngine();
    ink.setTool('pan');

    ink.pointerDown(50, 50);
    ink.pointerMove(70, 80);
    ink.pointerUp();

    assert.equal(ink.getStrokes().length, 0);
    const vp = ink.getViewport();
    assert.equal(vp.panX, 20);
    assert.equal(vp.panY, 30);
  });

  it('scales zoom within bounds [0.5, 4.0]', () => {
    const ink = createInkEngine();
    ink.setZoom(2.5);
    assert.equal(ink.getViewport().zoom, 2.5);

    // Over-zoom clamped to 4.0
    ink.setZoom(10.0);
    assert.equal(ink.getViewport().zoom, 4.0);

    // Under-zoom clamped to 0.5
    ink.setZoom(0.1);
    assert.equal(ink.getViewport().zoom, 0.5);
  });
});

// ---------------------------------------------------------------------------
// Fault N18: Orientation Switch Preservation
// ---------------------------------------------------------------------------

describe('Scratchpad — Fault N18 Orientation Switch', () => {
  it('preserves draft and strokes identically across orientation switch', () => {
    const scratchpad = createScratchpad(1600, 1000); // Landscape
    const ink = scratchpad.getInkEngine();

    // Draw stroke in landscape
    ink.pointerDown(300, 200);
    ink.pointerMove(350, 250);
    ink.pointerUp();

    scratchpad.getInkEngine().setTypedText('Proof step 1: F = ma');

    // Switch orientation to Portrait (1000 x 1600)
    scratchpad.handleOrientationSwitch(1000, 1600);

    // Draft MUST remain identical
    assert.equal(scratchpad.getViewState().strokeCount, 1);
    assert.equal(scratchpad.getViewState().typedText, 'Proof step 1: F = ma');
    assert.equal(ink.getStrokes()[0].points[0].x, 300/1600);
    assert.equal(ink.getViewport().width, 1000);
    assert.equal(ink.getViewport().height, 1600);
  });
});

// ---------------------------------------------------------------------------
// Fault N27: Virtual Keyboard Occlusion Defense
// ---------------------------------------------------------------------------

describe('Scratchpad — Fault N27 Virtual Keyboard Occlusion', () => {
  it('expands scroll bottom margin when virtual keyboard opens to keep controls reachable', () => {
    const scratchpad = createScratchpad();
    assert.equal(scratchpad.getViewState().bottomPaddingPx, 0);

    // Virtual keyboard appears (height 320px)
    scratchpad.setVirtualKeyboardHeight(320);

    // Bottom padding expands with safe margin (320 + 16 = 336px)
    const state = scratchpad.getViewState();
    assert.equal(state.virtualKeyboardHeightPx, 320);
    assert.equal(state.bottomPaddingPx, 336);
    assert.equal(state.isControlsReachable, false);
  });
});

// ---------------------------------------------------------------------------
// Typed Alternative Note-Taking & Mode Switching
// ---------------------------------------------------------------------------

describe('Scratchpad — Typed Alternative Mode', () => {
  it('toggles between drawing and typing while preserving both', () => {
    const scratchpad = createScratchpad();
    assert.equal(scratchpad.getMode(), 'DRAWING');

    scratchpad.getInkEngine().pointerDown(10, 10);
    scratchpad.getInkEngine().pointerUp();

    scratchpad.toggleMode();
    assert.equal(scratchpad.getMode(), 'TYPING');

    scratchpad.getInkEngine().setTypedText('Learner algebraic substitution');
    assert.equal(scratchpad.getViewState().typedText, 'Learner algebraic substitution');
    assert.equal(scratchpad.getViewState().strokeCount, 1);
  });
});

// ---------------------------------------------------------------------------
// Export / Import Roundtrip & Tool Palette Hit Targets
// ---------------------------------------------------------------------------

describe('Scratchpad — Export/Import Roundtrip & 48px Hit Targets', () => {
  it('exports to JSON artifact and imports back with zero data loss', () => {
    const scratchpad = createScratchpad();
    const ink = scratchpad.getInkEngine();

    ink.pointerDown(10, 20);
    ink.pointerMove(30, 40);
    ink.pointerUp();
    ink.setTypedText('Step 2: Conservation of momentum');

    const artifact = scratchpad.exportArtifact('art-test-01');
    assert.equal(artifact.id, 'art-test-01');
    assert.equal(artifact.type, 'COMPOSITE');

    // Restore into fresh scratchpad
    const freshScratchpad = createScratchpad();
    freshScratchpad.importArtifact(artifact);

    assert.equal(freshScratchpad.getViewState().strokeCount, 1);
    assert.equal(freshScratchpad.getViewState().typedText, 'Step 2: Conservation of momentum');
  });

  it('exports valid SVG markup with viewBox matching viewport', () => {
    const scratchpad = createScratchpad(800, 600);
    const ink = scratchpad.getInkEngine();

    ink.pointerDown(10, 10);
    ink.pointerMove(50, 50);
    ink.pointerUp();

    const svg = ink.exportSvg();
    assert.ok(svg.includes('<svg xmlns="http://www.w3.org/2000/svg"'));
    assert.ok(svg.includes('viewBox="0 0 800 600"'));
    assert.ok(svg.includes('<path d="M 10 10 L 50 50"'));
  });

  it('guarantees all tool palette buttons meet 48px minimum hit target', () => {
    const scratchpad = createScratchpad();
    const buttons = scratchpad.getPalette().getButtons();

    assert.ok(buttons.length >= 6);
    assert.ok(buttons.every((b) => b.minHitTargetPx >= 48));
  });
});

it('canceled eraser is non-destructive; immutable export and normalized rotation',async()=>{const i=createInkEngine(800,600);i.pointerDown(100,100);i.pointerUp();const a=i.exportArtifact('a');i.setTool('eraser');i.pointerDown(100,100);i.pointerCancel();assert.deepEqual(i.getStrokes(),a.strokes);const s=i.getStrokes();(s[0].points[0] as any).x=0;assert.equal(i.getStrokes()[0].points[0].x,.125);i.resizeViewport(400,300);assert.equal(i.getStrokes()[0].points[0].x,.125);assert.throws(()=>i.importArtifact({...a,strokes:[{...a.strokes[0],color:'" onload="bad'}]}));assert.deepEqual(i.getStrokes(),a.strokes);assert.deepEqual(await i.toWorkArtifact('s'),await i.toWorkArtifact('s'));assert.notEqual((await i.toWorkArtifact('s')).id,(await i.toWorkArtifact('t')).id);});

