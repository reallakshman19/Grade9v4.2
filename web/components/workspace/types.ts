/**
 * web/components/workspace/types.ts
 * A26 — Work artifact workspace types and tool definitions.
 *
 * No academic approval inferred from software validation.
 */

export type WorkspaceMode = 'DRAWING' | 'TYPING' | 'SPLIT';

export type WorkspaceToolAction =
  | 'PEN'
  | 'HIGHLIGHTER'
  | 'ERASER'
  | 'PAN'
  | 'UNDO'
  | 'REDO'
  | 'CLEAR'
  | 'ZOOM_IN'
  | 'ZOOM_OUT'
  | 'RESET_ZOOM'
  | 'TOGGLE_MODE';

export interface ToolButtonDescriptor {
  readonly action: WorkspaceToolAction;
  readonly label: string;
  readonly icon: string;
  readonly isActive: boolean;
  readonly isEnabled: boolean;
  readonly minHitTargetPx: number;
}

