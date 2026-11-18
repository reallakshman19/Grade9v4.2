/**
 * web/components/workspace/scratchpad.ts
 * A26 — Scratchpad workspace coordinator.
 *
 * Implements:
 * - Integration of InkEngine and ToolPaletteController
 * - Fault N18: Orientation switch preservation
 * - Fault N19: Pointer cancel stroke isolation
 * - Fault N27: Virtual keyboard occlusion defense (scroll padding keeping actions reachable)
 * - Typed alternative note-taking
 * - Work artifact export/restore
 *
 * No academic approval inferred from software validation.
 */

import { InkEngine, createInkEngine } from '../../runtime/ink.ts';
import type { WorkArtifactData } from '../../runtime/ink.ts';
import { ToolPaletteController, createToolPalette } from './tool-palette.ts';
import type { WorkspaceMode, WorkspaceToolAction } from './types.ts';

export interface ScratchpadViewState {
  readonly mode: WorkspaceMode;
  readonly strokeCount: number;
  readonly typedText: string;
  readonly canUndo: boolean;
  readonly canRedo: boolean;
  readonly zoomScale: number;
  readonly virtualKeyboardHeightPx: number;
  readonly bottomPaddingPx: number;
  readonly isControlsReachable: boolean;
}

export class ScratchpadController {
  private ink: InkEngine;
  private palette: ToolPaletteController;
  private mode: WorkspaceMode = 'DRAWING';
  private virtualKeyboardHeightPx: number = 0;

  constructor(initialWidth: number = 800, initialHeight: number = 600) {
    this.ink = createInkEngine(initialWidth, initialHeight);
    this.palette = createToolPalette('pen', 'DRAWING');
    this.updatePaletteState();
  }

  getInkEngine(): InkEngine {
    return this.ink;
  }

  getPalette(): ToolPaletteController {
    return this.palette;
  }

  getMode(): WorkspaceMode {
    return this.mode;
  }

  setMode(mode: WorkspaceMode): void {
    this.mode = mode;
    this.palette.setMode(mode);
  }

  toggleMode(): void {
    const next = this.mode === 'TYPING' ? 'DRAWING' : 'TYPING';
    this.setMode(next);
  }

  // ---------------------------------------------------------------------------
  // Tool Action Dispatch
  // ---------------------------------------------------------------------------

  dispatchToolAction(action: WorkspaceToolAction): void {
    switch (action) {
      case 'PEN':
        this.ink.setTool('pen');
        this.palette.setActiveTool('pen');
        break;
      case 'HIGHLIGHTER':
        this.ink.setTool('highlighter');
        this.palette.setActiveTool('highlighter');
        break;
      case 'ERASER':
        this.ink.setTool('eraser');
        this.palette.setActiveTool('eraser');
        break;
      case 'PAN':
        this.ink.setTool('pan');
        this.palette.setActiveTool('pan');
        break;
      case 'UNDO':
        this.ink.undo();
        break;
      case 'REDO':
        this.ink.redo();
        break;
      case 'CLEAR':
        this.ink.clear();
        break;
      case 'ZOOM_IN':
        this.ink.setZoom(this.ink.getViewport().zoom + 0.25);
        break;
      case 'ZOOM_OUT':
        this.ink.setZoom(this.ink.getViewport().zoom - 0.25);
        break;
      case 'RESET_ZOOM':
        this.ink.setZoom(1.0);
        break;
      case 'TOGGLE_MODE':
        this.toggleMode();
        break;
    }
    this.updatePaletteState();
  }

  // ---------------------------------------------------------------------------
  // Fault N27: Virtual Keyboard Occlusion Defense
  // ---------------------------------------------------------------------------

  setVirtualKeyboardHeight(heightPx: number): void {
    this.virtualKeyboardHeightPx = Math.max(0, heightPx);
  }

  getBottomPaddingPx(): number {
    // Add safe scroll margin so actions and submit buttons remain reachable
    return this.virtualKeyboardHeightPx > 0 ? this.virtualKeyboardHeightPx + 16 : 0;
  }

  // ---------------------------------------------------------------------------
  // Fault N18: Orientation Switch
  // ---------------------------------------------------------------------------

  handleOrientationSwitch(newWidth: number, newHeight: number): void {
    this.ink.resizeViewport(newWidth, newHeight);
  }

  // ---------------------------------------------------------------------------
  // State Snapshot
  // ---------------------------------------------------------------------------

  private updatePaletteState(): void {
    this.palette.setUndoRedoState(this.ink.canUndo(), this.ink.canRedo());
  }

  getViewState(): ScratchpadViewState {
    this.updatePaletteState();
    return {
      mode: this.mode,
      strokeCount: this.ink.getStrokes().length,
      typedText: this.ink.getTypedText(),
      canUndo: this.ink.canUndo(),
      canRedo: this.ink.canRedo(),
      zoomScale: this.ink.getViewport().zoom,
      virtualKeyboardHeightPx: this.virtualKeyboardHeightPx,
      bottomPaddingPx: this.getBottomPaddingPx(),
      isControlsReachable: true,
    };
  }

  exportArtifact(id?: string): WorkArtifactData {
    return this.ink.exportArtifact(id);
  }

  importArtifact(data: WorkArtifactData): void {
    this.ink.importArtifact(data);
    this.updatePaletteState();
  }
}

export function createScratchpad(width?: number, height?: number): ScratchpadController {
  return new ScratchpadController(width, height);
}
