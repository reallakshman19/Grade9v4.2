/**
 * web/components/reasoning-matrix.ts
 * Workpack A53: QRT curriculum and cell navigation component.
 *
 * Implements:
 * - 28-cell QRT cognitive demand matrix (7 operations x 4 demand bands D1-D4).
 * - Distinct cell visual and behavioral states: EMPTY, PENDING_REVIEW, UNAVAILABLE, VERIFIED_SYNTHETIC.
 * - Strict C06 v1.1 invariant enforcement: required MAIN, >=2 distinct INSTANCE references, no alias collision.
 * - Prohibition of candidate promotion: candidate cells are never labeled as verified.
 * - Dual responsive layouts: 2D keyboard-navigable table grid (landscape) and portrait list view.
 * - Interactive cell navigation with minimum 48px hit targets and roving/grid keyboard focus.
 * - Prohibition of progress-to-mastery claims: diagnostic structural coverage only.
 * - Zero reserved answers or solution disclosures.
 *
 * No academic approval inferred from software validation.
 */

import { escapeHtml as e } from '../runtime/rendering.ts';
import type { ReasoningCell, Ref } from '../runtime/types.ts';

export const QRT_OPERATIONS = [
  'RETRIEVE',
  'EXPLAIN',
  'APPLY',
  'MODEL',
  'REPRESENT',
  'SYNTHESIZE',
  'JUSTIFY',
] as const;
export type QrtOperation = typeof QRT_OPERATIONS[number];

export const DEMAND_BANDS = ['D1', 'D2', 'D3', 'D4'] as const;
export type DemandBand = typeof DEMAND_BANDS[number];

export type MatrixCellState =
  | 'EMPTY'
  | 'PENDING_REVIEW'
  | 'UNAVAILABLE'
  | 'VERIFIED_SYNTHETIC';

export interface C06ValidationResult {
  readonly valid: boolean;
  readonly errors: readonly string[];
}

export function validateC06(cell: ReasoningCell): C06ValidationResult {
  const errors: string[] = [];

  if (cell.c06_v11) {
    if (!cell.main) {
      errors.push('C06_MISSING_MAIN: c06_v11 requires a non-null main task reference.');
    }
    if (!Array.isArray(cell.instances) || cell.instances.length < 2) {
      errors.push('C06_MIN_INSTANCES: c06_v11 requires at least 2 distinct instance references.');
    }
  }

  // Check duplicate instances
  if (Array.isArray(cell.instances)) {
    const seen = new Set<string>();
    for (const inst of cell.instances) {
      const key = `${inst.type}:${inst.id}`;
      if (seen.has(key)) {
        errors.push(`C06_DUPLICATE_INSTANCE: Duplicate instance reference ${key}`);
      }
      seen.add(key);
    }

    // Check main in instances collision
    if (cell.main) {
      const mainKey = `${cell.main.type}:${cell.main.id}`;
      if (seen.has(mainKey)) {
        errors.push(`C06_MAIN_INSTANCE_ALIAS: Main reference ${mainKey} cannot also appear in instances.`);
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function evaluateCellState(cell?: ReasoningCell | null): MatrixCellState {
  if (!cell) {
    return 'EMPTY';
  }

  const c06 = validateC06(cell);
  if (!c06.valid) {
    return 'UNAVAILABLE';
  }

  if (cell.status === 'CANDIDATE' || cell.status === 'HOLD') {
    return 'PENDING_REVIEW';
  }

  if (cell.status === 'SYNTHETIC') {
    return 'VERIFIED_SYNTHETIC';
  }

  return 'UNAVAILABLE';
}

export interface ReasoningMatrixProps {
  readonly cells: readonly ReasoningCell[];
  readonly selectedCellId?: string | null;
  readonly isPortrait?: boolean;
  readonly onSelectCell?: (cell: ReasoningCell | null, op: QrtOperation, band: DemandBand) => void;
}

export class ReasoningMatrixComponent {
  private cellsByCoord = new Map<string, ReasoningCell>();
  private focusedCoord: { opIndex: number; bandIndex: number } = { opIndex: 0, bandIndex: 0 };
  private selectedCellId: string | null = null;
  private isPortrait: boolean = false;
  private onSelectCell?: (cell: ReasoningCell | null, op: QrtOperation, band: DemandBand) => void;

  constructor(props: ReasoningMatrixProps) {
    this.updateProps(props);
  }

  updateProps(props: ReasoningMatrixProps): void {
    this.selectedCellId = props.selectedCellId ?? null;
    this.isPortrait = props.isPortrait ?? false;
    this.onSelectCell = props.onSelectCell;

    this.cellsByCoord.clear();
    for (const cell of props.cells) {
      const key = `${cell.operation}:${cell.demand_band}`;
      this.cellsByCoord.set(key, cell);
    }
  }

  getCell(op: QrtOperation, band: DemandBand): ReasoningCell | null {
    return this.cellsByCoord.get(`${op}:${band}`) ?? null;
  }

  getFocusedCoord(): { operation: QrtOperation; demandBand: DemandBand } {
    return {
      operation: QRT_OPERATIONS[this.focusedCoord.opIndex],
      demandBand: DEMAND_BANDS[this.focusedCoord.bandIndex],
    };
  }

  handleKeyDown(key: string): boolean {
    let handled = false;
    switch (key) {
      case 'ArrowUp':
        this.focusedCoord.opIndex = (this.focusedCoord.opIndex - 1 + QRT_OPERATIONS.length) % QRT_OPERATIONS.length;
        handled = true;
        break;
      case 'ArrowDown':
        this.focusedCoord.opIndex = (this.focusedCoord.opIndex + 1) % QRT_OPERATIONS.length;
        handled = true;
        break;
      case 'ArrowLeft':
        this.focusedCoord.bandIndex = (this.focusedCoord.bandIndex - 1 + DEMAND_BANDS.length) % DEMAND_BANDS.length;
        handled = true;
        break;
      case 'ArrowRight':
        this.focusedCoord.bandIndex = (this.focusedCoord.bandIndex + 1) % DEMAND_BANDS.length;
        handled = true;
        break;
      case 'Enter':
      case ' ': {
        const op = QRT_OPERATIONS[this.focusedCoord.opIndex];
        const band = DEMAND_BANDS[this.focusedCoord.bandIndex];
        const cell = this.getCell(op, band);
        this.selectedCellId = cell?.cell_id ?? null;
        if (this.onSelectCell) {
          this.onSelectCell(cell, op, band);
        }
        handled = true;
        break;
      }
    }
    return handled;
  }

  getSummary(): { total: number; populated: number; verified: number; pending: number; empty: number } {
    let verified = 0;
    let pending = 0;
    let empty = 0;

    for (const op of QRT_OPERATIONS) {
      for (const band of DEMAND_BANDS) {
        const cell = this.getCell(op, band);
        const state = evaluateCellState(cell);
        if (state === 'VERIFIED_SYNTHETIC') verified++;
        else if (state === 'PENDING_REVIEW') pending++;
        else if (state === 'EMPTY') empty++;
      }
    }

    return {
      total: QRT_OPERATIONS.length * DEMAND_BANDS.length,
      populated: verified + pending,
      verified,
      pending,
      empty,
    };
  }

  renderHtml(): string {
    const summary = this.getSummary();

    const header = `
      <div class="qrt-matrix-header">
        <h2>QRT Cognitive Demand Matrix</h2>
        <p class="qrt-matrix-disclaimer">Diagnostic structural coverage only. No topic mastery or academic certification is inferred from cell completion.</p>
        <div class="qrt-matrix-metrics" aria-label="Matrix summary metrics">
          <span class="metric-tag">Total Cells: ${summary.total}</span>
          <span class="metric-tag verified">Verified (Synthetic): ${summary.verified}</span>
          <span class="metric-tag pending">Pending Review: ${summary.pending}</span>
          <span class="metric-tag empty">Empty: ${summary.empty}</span>
        </div>
      </div>
    `;

    if (this.isPortrait) {
      return `<section class="qrt-matrix-container portrait" data-layout="portrait">${header}${this.renderPortraitList()}</section>`;
    }

    return `<section class="qrt-matrix-container landscape" data-layout="landscape">${header}${this.renderTableGrid()}</section>`;
  }

  private renderTableGrid(): string {
    let rowsHtml = '';

    for (let r = 0; r < QRT_OPERATIONS.length; r++) {
      const op = QRT_OPERATIONS[r];
      let cellsHtml = `<th scope="row" class="qrt-row-header">${e(op)}</th>`;

      for (let c = 0; c < DEMAND_BANDS.length; c++) {
        const band = DEMAND_BANDS[c];
        const cell = this.getCell(op, band);
        const state = evaluateCellState(cell);
        const isSelected = cell && cell.cell_id === this.selectedCellId;
        const isFocused = r === this.focusedCoord.opIndex && c === this.focusedCoord.bandIndex;

        const label = cell
          ? `${op} ${band}: ${state === 'VERIFIED_SYNTHETIC' ? 'Synthetic Cell' : 'Pending Review'} ${cell.cell_id}`
          : `${op} ${band}: Empty`;

        cellsHtml += `
          <td role="gridcell" class="qrt-grid-cell ${state.toLowerCase()} ${isSelected ? 'selected' : ''}">
            <button
              type="button"
              class="qrt-cell-btn"
              data-op="${e(op)}"
              data-band="${e(band)}"
              data-cell-id="${cell ? e(cell.cell_id) : ''}"
              data-state="${e(state)}"
              aria-label="${e(label)}"
              tabindex="${isFocused ? '0' : '-1'}"
              style="min-width: 48px; min-height: 48px;"
            >
              <span class="qrt-cell-state-badge">${this.getStateBadgeText(state)}</span>
              ${cell ? `<span class="qrt-cell-id-text">${e(cell.cell_id)}</span>` : '<span class="qrt-cell-empty-text">&mdash;</span>'}
            </button>
          </td>
        `;
      }

      rowsHtml += `<tr>${cellsHtml}</tr>`;
    }

    return `
      <div class="qrt-table-wrapper" style="overflow-x: auto;">
        <table class="qrt-matrix-table" role="grid" aria-label="QRT Cognitive Demand Grid">
          <thead>
            <tr>
              <th scope="col" class="qrt-corner-header">Operation \\ Demand</th>
              ${DEMAND_BANDS.map(b => `<th scope="col" class="qrt-col-header">${e(b)}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>
      </div>
    `;
  }

  private renderPortraitList(): string {
    let sectionsHtml = '';

    for (let r = 0; r < QRT_OPERATIONS.length; r++) {
      const op = QRT_OPERATIONS[r];
      let itemsHtml = '';

      for (let c = 0; c < DEMAND_BANDS.length; c++) {
        const band = DEMAND_BANDS[c];
        const cell = this.getCell(op, band);
        const state = evaluateCellState(cell);
        const isSelected = cell && cell.cell_id === this.selectedCellId;

        itemsHtml += `
          <li class="qrt-list-item ${state.toLowerCase()} ${isSelected ? 'selected' : ''}">
            <button
              type="button"
              class="qrt-list-item-btn"
              data-op="${e(op)}"
              data-band="${e(band)}"
              data-cell-id="${cell ? e(cell.cell_id) : ''}"
              data-state="${e(state)}"
              style="min-width: 48px; min-height: 48px; width: 100%; text-align: left;"
            >
              <div class="qrt-list-item-header">
                <span class="qrt-band-tag">${e(band)}</span>
                <span class="qrt-state-tag ${state.toLowerCase()}">${this.getStateBadgeText(state)}</span>
              </div>
              <div class="qrt-list-item-body">
                ${cell ? `
                  <strong class="qrt-cell-id">${e(cell.cell_id)}</strong>
                  <div class="qrt-cell-refs">
                    <span>Instances: ${cell.instances.length}</span>
                    <span>Main: ${cell.main ? e(cell.main.id) : 'None'}</span>
                  </div>
                ` : `
                  <span class="qrt-empty-note">No curriculum cell mapped</span>
                `}
              </div>
            </button>
          </li>
        `;
      }

      sectionsHtml += `
        <div class="qrt-operation-group">
          <h3 class="qrt-operation-title">${e(op)}</h3>
          <ul class="qrt-operation-list" role="list">
            ${itemsHtml}
          </ul>
        </div>
      `;
    }

    return `<div class="qrt-portrait-view">${sectionsHtml}</div>`;
  }

  private getStateBadgeText(state: MatrixCellState): string {
    switch (state) {
      case 'VERIFIED_SYNTHETIC':
        return 'Synthetic';
      case 'PENDING_REVIEW':
        return 'Pending Review';
      case 'UNAVAILABLE':
        return 'Unavailable';
      case 'EMPTY':
        return 'Empty';
    }
  }
}
