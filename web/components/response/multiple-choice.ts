/**
 * web/components/response/multiple-choice.ts
 * A24 — Multiple choice objective response component controller.
 *
 * Enforces:
 * - Minimum 48px hit target size per option
 * - Strict commit lock (no mutation when locked)
 * - Keyboard navigation parity
 *
 * No academic approval inferred from software validation.
 */

import { HIT_TARGET_MIN_PX } from '../../styles/tokens.ts';
import type { ChoiceOption, ResponseInputController } from './types.ts';

export interface MultipleChoiceValue {
  readonly kind: 'MULTIPLE_CHOICE';
  readonly selectedOptionIds: readonly string[];
}

export class MultipleChoiceController implements ResponseInputController<MultipleChoiceValue> {
  private options: readonly ChoiceOption[];
  private selectedOptionIds: Set<string>;
  private locked: boolean = false;
  private focusedOptionIndex: number = 0;

  constructor(options: readonly ChoiceOption[], initialSelectedIds: readonly string[] = []) {
    if(new Set(options.map(o=>o.id)).size!==options.length)throw Error('Duplicate option identity');this.options=Object.freeze(options.map(o=>Object.freeze({...o})));
    if(new Set(initialSelectedIds).size!==initialSelectedIds.length||!initialSelectedIds.every(id=>this.options.some(o=>o.id===id)))throw Error('Invalid initial option IDs');this.selectedOptionIds=new Set(initialSelectedIds);
  }

  getOptions(): readonly ChoiceOption[] {
    return this.options;
  }

  getValue(): MultipleChoiceValue {
    return {
      kind: 'MULTIPLE_CHOICE',
      selectedOptionIds: Array.from(this.selectedOptionIds),
    };
  }

  setValue(value: MultipleChoiceValue): void {
    if (this.locked) return;
    if(new Set(value.selectedOptionIds).size===value.selectedOptionIds.length&&value.selectedOptionIds.every(id=>this.options.some(o=>o.id===id)))this.selectedOptionIds=new Set(value.selectedOptionIds);
  }

  toggleOption(optionId: string): boolean {
    if (this.locked) return false;
    const exists = this.options.some((opt) => opt.id === optionId);
    if (!exists) return false;

    if (this.selectedOptionIds.has(optionId)) {
      this.selectedOptionIds.delete(optionId);
    } else {
      this.selectedOptionIds.add(optionId);
    }
    return true;
  }

  isAnswered(): boolean {
    return this.selectedOptionIds.size > 0;
  }

  setLocked(locked: boolean): void {
    this.locked = locked;
  }

  isLocked(): boolean {
    return this.locked;
  }

  reset(): void {
    if (this.locked) return;
    this.selectedOptionIds.clear();
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
        this.toggleOption(targetOption.id);
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

export function createMultipleChoiceController(
  options: readonly ChoiceOption[],
  initialSelectedIds?: readonly string[]
): MultipleChoiceController {
  return new MultipleChoiceController(options, initialSelectedIds);
}
