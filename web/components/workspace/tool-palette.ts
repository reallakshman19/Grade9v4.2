/**
 * web/components/workspace/tool-palette.ts
 * A26 — Stylus workspace tool palette controller.
 *
 * Enforces:
 * - 48px minimum hit target size across all buttons.
 * - Active tool highlighting.
 * - Undo/Redo/Zoom trigger actions.
 *
 * No academic approval inferred from software validation.
 */

import { HIT_TARGET_MIN_PX } from '../../styles/tokens.ts';
import type { WorkspaceMode, WorkspaceToolAction, ToolButtonDescriptor } from './types.ts';
import type { InkTool } from '../../runtime/ink.ts';

export class ToolPaletteController {
  private activeTool: InkTool = 'pen';
  private mode: WorkspaceMode = 'DRAWING';
  private canUndo: boolean = false;
  private canRedo: boolean = false;

  constructor(initialTool: InkTool = 'pen', initialMode: WorkspaceMode = 'DRAWING') {
    this.activeTool = initialTool;
    this.mode = initialMode;
  }

  getActiveTool(): InkTool {
    return this.activeTool;
  }

  setActiveTool(tool: InkTool): void {
    this.activeTool = tool;
  }

  getMode(): WorkspaceMode {
    return this.mode;
  }

  setMode(mode: WorkspaceMode): void {
    this.mode = mode;
  }

  setUndoRedoState(canUndo: boolean, canRedo: boolean): void {
    this.canUndo = canUndo;
    this.canRedo = canRedo;
  }

  getButtons(): readonly ToolButtonDescriptor[] {
    return [
      {
        action: 'PEN',
        label: 'Stylus Pen',
        icon: 'pen',
        isActive: this.activeTool === 'pen',
        isEnabled: this.mode !== 'TYPING',
        minHitTargetPx: HIT_TARGET_MIN_PX,
      },
      {
        action: 'HIGHLIGHTER',
        label: 'Highlighter',
        icon: 'highlighter',
        isActive: this.activeTool === 'highlighter',
        isEnabled: this.mode !== 'TYPING',
        minHitTargetPx: HIT_TARGET_MIN_PX,
      },
      {
        action: 'ERASER',
        label: 'Eraser',
        icon: 'eraser',
        isActive: this.activeTool === 'eraser',
        isEnabled: this.mode !== 'TYPING',
        minHitTargetPx: HIT_TARGET_MIN_PX,
      },
      {
        action: 'PAN',
        label: 'Pan Canvas',
        icon: 'hand',
        isActive: this.activeTool === 'pan',
        isEnabled: this.mode !== 'TYPING',
        minHitTargetPx: HIT_TARGET_MIN_PX,
      },
      {
        action: 'UNDO',
        label: 'Undo',
        icon: 'undo',
        isActive: false,
        isEnabled: this.canUndo,
        minHitTargetPx: HIT_TARGET_MIN_PX,
      },
      {
        action: 'REDO',
        label: 'Redo',
        icon: 'redo',
        isActive: false,
        isEnabled: this.canRedo,
        minHitTargetPx: HIT_TARGET_MIN_PX,
      },
      {
        action: 'TOGGLE_MODE',
        label: this.mode === 'TYPING' ? 'Switch to Pen' : 'Switch to Typed Notes',
        icon: 'keyboard',
        isActive: this.mode === 'TYPING',
        isEnabled: true,
        minHitTargetPx: HIT_TARGET_MIN_PX,
      },
    ];
  }
}

export function createToolPalette(initialTool?: InkTool, initialMode?: WorkspaceMode): ToolPaletteController {
  return new ToolPaletteController(initialTool, initialMode);
}

