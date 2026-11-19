/**
 * web/components/teaching/index.ts
 * A51 — Progressive Core1A teaching components export index.
 *
 * Re-exports:
 * - Core1AUnitViewController & UnitViewConfig
 * - Core1AAnchorViewController & AnchorViewConfig
 * - Core1AModelStageController & ModelStageViewState
 *
 * No academic approval inferred from software validation.
 */

export { Core1AUnitViewController } from './unit-view.ts';
export type { UnitViewState, UnitViewConfig } from './unit-view.ts';

export { Core1AAnchorViewController } from './anchor-view.ts';
export type { AnchorViewState, AnchorViewConfig } from './anchor-view.ts';

export { Core1AModelStageController } from './model-stage.ts';
export type { ModelStageViewState } from './model-stage.ts';

