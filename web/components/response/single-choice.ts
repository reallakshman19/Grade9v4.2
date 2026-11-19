/**
 * web/components/response/single-choice.ts
 * A24 — Single choice objective response component controller.
 *
 * Enforces:
 * - Minimum 48px hit target size per option
 * - Strict commit lock (no mutation when locked)
 * - Keyboard navigation parity (Up/Down/Space/Enter)
 *
 * No academic approval inferred from software validation.
 */

import { HIT_TARGET_MIN_PX } from '../../styles/tokens.ts';
import type { ChoiceOption, ResponseInputController } from './types.ts';

export interface SingleChoiceValue {
  readonly kind: 'SINGLE_CHOICE';
  readonly selectedOptionId: string | null;
}

export class SingleChoiceController implements ResponseInputController<SingleChoiceValue> {
  private options: readonly ChoiceOption[];
  private selectedOptionId: string | null = null;
  private locked: boolean = false;
  private focusedOptionIndex: number = 0;

  constructor(options: readonly ChoiceOption[], initialSelectedId: string | null = null) {
    if(new Set(options.map(o=>o.id)).size!==options.length)throw Error('Duplicate option identity');this.options=Object.freeze(options.map(o=>Object.freeze({...o})));
    this.selectedOptionId=initialSelectedId!==null&&this.options.some(o=>o.id===initialSelectedId)?initialSelectedId:null;
  }

  getOptions(): readonly ChoiceOption[] {
    return this.options;
  }

  getValue(): SingleChoiceValue {
    return {
      kind: 'SINGLE_CHOICE',
      selectedOptionId: this.selectedOptionId,
    };
  }

  setValue(value: SingleChoiceValue): void {
    if (this.locked) return;
    if(value.selectedOptionId===null||this.options.some(o=>o.id===value.selectedOptionId))this.selectedOptionId=value.selectedOptionId;
  }

  selectOption(optionId: string): boolean {
    if (this.locked) return false;
    const exists = this.options.some((opt) => opt.id === optionId);
    if (!exists) return false;
    this.selectedOptionId = optionId;
    return true;
  }

  isAnswered(): boolean {
    return this.selectedOptionId !== null;
  }

  setLocked(locked: boolean): void {
    this.locked = locked;
  }

  isLocked(): boolean {
    return this.locked;
  }

  reset(): void {
    if (this.locked) return;
    this.selectedOptionId = null;
    this.focusedOptionIndex = 0;
  }

  handleKeyDown(key: string): boolean {
    if (this.locked) return false;
    if (this.options.length === 0) return false;

    if (key === 'ArrowDown' || key === 'ArrowRight') {
      this.focusedOptionIndex = (this.focusedOptionIndex + 1) % this.options.length;
      return true;
    }
    if (key === 'ArrowUp' || key === 'ArrowLeft') {
      this.focusedOptionIndex = (this.focusedOptionIndex - 1 + this.options.length) % this.options.length;
      return true;
    }
    if (key === ' ' || key === 'Enter') {
      const targetOption = this.options[this.focusedOptionIndex];
      if (targetOption) {
        this.selectOption(targetOption.id);
        return true;
      }
    }
    return false;
  }

  getFocusedOptionIndex(): number {
    return this.focusedOptionIndex;
  }

  getMinHitTargetPx(): number {
    return HIT_TARGET_MIN_PX;
  }
}

export function createSingleChoiceController(
  options: readonly ChoiceOption[],
  initialSelectedId?: string | null
): SingleChoiceController {
  return new SingleChoiceController(options, initialSelectedId);
}

