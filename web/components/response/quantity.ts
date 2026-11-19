/**
 * web/components/response/quantity.ts
 * A24 — Numeric quantity objective response component controller.
 *
 * Enforces:
 * - Minimum 48px hit target size for inputs and unit dropdowns
 * - Strict commit lock (no mutation when locked)
 * - Validation of magnitude and unit conformity
 *
 * No academic approval inferred from software validation.
 */

import { HIT_TARGET_MIN_PX } from '../../styles/tokens.ts';
import type { NumericQuantityValue, ResponseInputController } from './types.ts';

export interface QuantityResponseValue {
  readonly kind: 'NUMERIC_QUANTITY';
  readonly quantity: NumericQuantityValue | null;
}

export class QuantityResponseController implements ResponseInputController<QuantityResponseValue> {
  private allowedUnits: readonly string[];
  private currentMagnitude: number | null = null;
  private currentDecimal:string|null=null;
  private currentUnit: string = '';
  private locked: boolean = false;

  constructor(allowedUnits: readonly string[] = [], initialValue?: NumericQuantityValue | null) {
    this.allowedUnits = [...allowedUnits];
    if (initialValue) {
      if(initialValue.decimal&&this.setMagnitude(initialValue.decimal)&&this.setUnit(initialValue.unit)){}else this.currentMagnitude=null;
    } else if (this.allowedUnits.length > 0) {
      this.currentUnit = this.allowedUnits[0];
    }
  }

  getAllowedUnits(): readonly string[] {
    return this.allowedUnits;
  }

  getValue(): QuantityResponseValue {
    if (this.currentMagnitude === null) {
      return { kind: 'NUMERIC_QUANTITY', quantity: null };
    }
    return {
      kind: 'NUMERIC_QUANTITY',
      quantity: {
        magnitude: this.currentMagnitude,
        decimal:this.currentDecimal!,
        unit: this.currentUnit,
      },
    };
  }

  setValue(value: QuantityResponseValue): void {
    if (this.locked) return;
    if (value.quantity) {
      if(!value.quantity.decimal||!this.setMagnitude(value.quantity.decimal)||!this.setUnit(value.quantity.unit)){this.currentMagnitude=null;this.currentDecimal=null;}
    } else {
      this.currentMagnitude = null;this.currentDecimal=null;
    }
  }

  setMagnitude(magnitudeStr: string): boolean {
    if (this.locked) return false;
    const trimmed = magnitudeStr.trim();
    if (trimmed === '') {
      this.currentMagnitude = null;this.currentDecimal=null;
      return true;
    }
    if(!/^-?[0-9]+(?:\.[0-9]+)?$/.test(trimmed)||trimmed.length>4096)return false;
    const parsed = Number(trimmed);
    if (Number.isNaN(parsed) || !Number.isFinite(parsed)) {
      return false;
    }
    this.currentMagnitude = parsed;this.currentDecimal=trimmed;
    return true;
  }

  setUnit(unit: string): boolean {
    if (this.locked) return false;
    if (!unit.trim()||this.allowedUnits.length > 0 && !this.allowedUnits.includes(unit)) {
      return false;
    }
    this.currentUnit = unit;
    return true;
  }

  isAnswered(): boolean {
    return this.currentDecimal!==null&&this.currentMagnitude !== null&&!!this.currentUnit;
  }

  setLocked(locked: boolean): void {
    this.locked = locked;
  }

  isLocked(): boolean {
    return this.locked;
  }

  reset(): void {
    if (this.locked) return;
    this.currentMagnitude = null;this.currentDecimal=null;
    if (this.allowedUnits.length > 0) {
      this.currentUnit = this.allowedUnits[0];
    }
  }

  getMinHitTargetPx(): number {
    return HIT_TARGET_MIN_PX;
  }
}

export function createQuantityResponseController(
  allowedUnits?: readonly string[],
  initialValue?: NumericQuantityValue | null
): QuantityResponseController {
  return new QuantityResponseController(allowedUnits, initialValue);
}

