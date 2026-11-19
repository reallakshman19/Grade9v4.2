/**
 * web/pages/reasoning.ts
 * Workpack A53: QRT curriculum and cell navigation page controller.
 *
 * Implements:
 * - Authorized concept/reasoning/source projections rendering.
 * - Reviewed cell, main task link, and instance task links.
 * - Distinct cell states: EMPTY, PENDING_REVIEW, UNAVAILABLE, VERIFIED_SYNTHETIC.
 * - Dual responsive layouts: Landscape 2D keyboard-accessible table and Portrait linear list.
 * - Strict C06 constraint compliance verification.
 * - Candidate cell containment: candidates are never labeled as verified.
 * - Zero progress-to-mastery claims (Rule 13 invariant).
 * - Zero reserved answer or solution leakage.
 *
 * No academic approval inferred from software validation.
 */

import { escapeHtml as e } from '../runtime/rendering.ts';
import type { ReasoningCell, Ref } from '../runtime/types.ts';
import {
  ReasoningMatrixComponent,
  evaluateCellState,
  validateC06,
  QRT_OPERATIONS,
  DEMAND_BANDS,
  type QrtOperation,
  type DemandBand,
  type MatrixCellState,
} from '../components/reasoning-matrix.ts';

export type DisplayOrientation = 'LANDSCAPE' | 'PORTRAIT';
export type ReasoningScreenState = 'loading' | 'populated' | 'empty' | 'unavailable' | 'error';

export interface ReasoningPageConfig {
  readonly subjectId?: 'PHYSICS' | 'CHEMISTRY' | 'MATHEMATICS' | 'BIOLOGY';
  readonly topicId?: string;
  readonly topicTitle?: string;
  readonly cells?: readonly ReasoningCell[];
  readonly orientation?: DisplayOrientation;
  readonly initialSelectedCellId?: string | null;
  readonly errorMessage?: string;
}

export interface ReasoningPageState {
  readonly screenState: ReasoningScreenState;
  readonly subjectId: string;
  readonly topicId: string;
  readonly topicTitle: string;
  readonly orientation: DisplayOrientation;
  readonly selectedCell: ReasoningCell | null;
  readonly selectedCellState: MatrixCellState | null;
  readonly operationFilter: QrtOperation | null;
  readonly demandFilter: DemandBand | null;
  readonly minHitTargetPx: number;
}

export class ReasoningPageController {
  private subjectId: string;
  private topicId: string;
  private topicTitle: string;
  private orientation: DisplayOrientation = 'LANDSCAPE';
  private screenState: ReasoningScreenState = 'loading';
  private cells: ReasoningCell[] = [];
  private selectedCellId: string | null = null;
  private operationFilter: QrtOperation | null = null;
  private demandFilter: DemandBand | null = null;
  private errorMessage: string = '';
  private matrix: ReasoningMatrixComponent;

  constructor(config: ReasoningPageConfig = {}) {
    this.subjectId = config.subjectId ?? 'PHYSICS';
    this.topicId = config.topicId ?? 'kinematics';
    this.topicTitle = config.topicTitle ?? 'Kinematics & Contact Dynamics';
    this.orientation = config.orientation ?? 'LANDSCAPE';
    this.selectedCellId = config.initialSelectedCellId ?? null;

    if (config.errorMessage) {
      this.screenState = 'error';
      this.errorMessage = config.errorMessage;
    } else if (config.cells) {
      this.cells = [...config.cells];
      this.screenState = this.cells.length > 0 ? 'populated' : 'empty';
    } else {
      this.screenState = 'empty';
    }

    this.matrix = new ReasoningMatrixComponent({
      cells: this.getFilteredCells(),
      selectedCellId: this.selectedCellId,
      isPortrait: this.orientation === 'PORTRAIT',
      onSelectCell: (cell) => {
        this.selectedCellId = cell ? cell.cell_id : null;
      },
    });

    if (this.selectedCellId && !this.getSelectedCell()) {
      // If initial cell not found
      this.selectedCellId = null;
    }
  }

  setOrientation(orientation: DisplayOrientation): void {
    if (orientation !== 'LANDSCAPE' && orientation !== 'PORTRAIT') {
      throw new Error(`Invalid orientation: ${orientation}`);
    }
    this.orientation = orientation;
    this.matrix.updateProps({
      cells: this.getFilteredCells(),
      selectedCellId: this.selectedCellId,
      isPortrait: this.orientation === 'PORTRAIT',
    });
  }

  getOrientation(): DisplayOrientation {
    return this.orientation;
  }

  selectCell(cellId: string | null): void {
    this.selectedCellId = cellId;
    this.matrix.updateProps({
      cells: this.getFilteredCells(),
      selectedCellId: this.selectedCellId,
      isPortrait: this.orientation === 'PORTRAIT',
    });
  }

  selectCellByCoord(op: QrtOperation, band: DemandBand): void {
    const cell = this.matrix.getCell(op, band);
    this.selectedCellId = cell ? cell.cell_id : null;
    this.matrix.updateProps({
      cells: this.getFilteredCells(),
      selectedCellId: this.selectedCellId,
      isPortrait: this.orientation === 'PORTRAIT',
    });
  }

  filterByOperation(op: QrtOperation | null): void {
    this.operationFilter = op;
    this.matrix.updateProps({
      cells: this.getFilteredCells(),
      selectedCellId: this.selectedCellId,
      isPortrait: this.orientation === 'PORTRAIT',
    });
  }

  filterByDemand(band: DemandBand | null): void {
    this.demandFilter = band;
    this.matrix.updateProps({
      cells: this.getFilteredCells(),
      selectedCellId: this.selectedCellId,
      isPortrait: this.orientation === 'PORTRAIT',
    });
  }

  getSelectedCell(): ReasoningCell | null {
    if (!this.selectedCellId) return null;
    return this.cells.find(c => c.cell_id === this.selectedCellId) ?? null;
  }

  actionReturn(): string {
    return `/topic/${this.topicId}`;
  }

  actionLaunchMain(): string | null {
    const cell = this.getSelectedCell();
    if (!cell || !cell.main) return null;
    return `/question/${cell.main.id}`;
  }

  actionLaunchInstance(index: number): string | null {
    const cell = this.getSelectedCell();
    if (!cell || !cell.instances || index < 0 || index >= cell.instances.length) return null;
    return `/question/${cell.instances[index].id}`;
  }

  handleKeyDown(key: string): boolean {
    const handled = this.matrix.handleKeyDown(key);
    if (handled) {
      const coord = this.matrix.getFocusedCoord();
      const cell = this.matrix.getCell(coord.operation, coord.demandBand);
      if (cell) {
        this.selectedCellId = cell.cell_id;
      }
    }
    return handled;
  }

  getViewState(): ReasoningPageState {
    const selected = this.getSelectedCell();
    return {
      screenState: this.screenState,
      subjectId: this.subjectId,
      topicId: this.topicId,
      topicTitle: this.topicTitle,
      orientation: this.orientation,
      selectedCell: selected ? structuredClone(selected) : null,
      selectedCellState: selected ? evaluateCellState(selected) : null,
      operationFilter: this.operationFilter,
      demandFilter: this.demandFilter,
      minHitTargetPx: 48,
    };
  }

  exportState(): Record<string, unknown> {
    return {
      subjectId: this.subjectId,
      topicId: this.topicId,
      orientation: this.orientation,
      selectedCellId: this.selectedCellId,
      operationFilter: this.operationFilter,
      demandFilter: this.demandFilter,
    };
  }

  restoreState(saved: Record<string, unknown>): void {
    if (typeof saved.orientation === 'string' && (saved.orientation === 'LANDSCAPE' || saved.orientation === 'PORTRAIT')) {
      this.orientation = saved.orientation;
    }
    if (typeof saved.selectedCellId === 'string' || saved.selectedCellId === null) {
      this.selectedCellId = saved.selectedCellId as string | null;
    }
    if (typeof saved.operationFilter === 'string' || saved.operationFilter === null) {
      this.operationFilter = saved.operationFilter as QrtOperation | null;
    }
    if (typeof saved.demandFilter === 'string' || saved.demandFilter === null) {
      this.demandFilter = saved.demandFilter as DemandBand | null;
    }
    this.matrix.updateProps({
      cells: this.getFilteredCells(),
      selectedCellId: this.selectedCellId,
      isPortrait: this.orientation === 'PORTRAIT',
    });
  }

  private getFilteredCells(): ReasoningCell[] {
    return this.cells.filter(c => {
      if (this.operationFilter && c.operation !== this.operationFilter) return false;
      if (this.demandFilter && c.demand_band !== this.demandFilter) return false;
      return true;
    });
  }

  renderHtml(): string {
    const state = this.getViewState();

    if (state.screenState === 'error') {
      return `
        <main class="g9-reasoning-page error" data-orientation="${e(state.orientation)}">
          <header class="g9-page-header">
            <a href="${e(this.actionReturn())}" class="back-link" style="min-height: 48px; min-width: 48px;">&larr; Back to Topic</a>
            <h1>Reasoning Error</h1>
          </header>
          <div role="alert" class="error-banner">
            <p>${e(this.errorMessage || 'Reasoning curriculum matrix unavailable.')}</p>
          </div>
        </main>
      `;
    }

    const matrixHtml = this.matrix.renderHtml();
    const detailHtml = this.renderDetailPanel(state.selectedCell, state.selectedCellState);

    const layoutStyle = state.orientation === 'LANDSCAPE'
      ? 'display: grid; grid-template-columns: 2fr 1fr; gap: 24px; align-items: start;'
      : 'display: flex; flex-direction: column; gap: 24px;';

    return `
      <main class="g9-reasoning-page" data-orientation="${e(state.orientation)}">
        <header class="g9-page-header">
          <a href="${e(this.actionReturn())}" class="back-link" style="min-height: 48px; min-width: 48px; display: inline-flex; align-items: center;">&larr; Back to Topic</a>
          <div class="header-titles">
            <span class="subject-tag">${e(state.subjectId)}</span>
            <h1>QRT Reasoning Matrix &mdash; ${e(state.topicTitle)}</h1>
          </div>
          <div class="view-controls" aria-label="Layout and orientation controls">
            <button
              type="button"
              class="orientation-toggle"
              data-active-orientation="${e(state.orientation)}"
              style="min-height: 48px; min-width: 48px;"
            >
              Layout: ${state.orientation === 'LANDSCAPE' ? 'Grid (Table)' : 'Portrait (List)'}
            </button>
          </div>
        </header>

        <div class="reasoning-body" style="${layoutStyle}">
          <div class="matrix-section">
            ${matrixHtml}
          </div>
          <aside class="detail-section" aria-label="Cell details panel">
            ${detailHtml}
          </aside>
        </div>

        <footer class="reasoning-footer">
          <p class="rule13-banner">
            <strong>Rule 13 Invariant:</strong> No academic approval inferred from software validation.
            Cognitive operations and demand bands represent structural curriculum indexing, not learner proficiency certification.
          </p>
        </footer>
      </main>
    `;
  }

  private renderDetailPanel(cell: ReasoningCell | null, cellState: MatrixCellState | null): string {
    if (!cell) {
      return `
        <div class="cell-detail-card empty-selection">
          <h3>Cell Inspector</h3>
          <p class="empty-hint">Select any cell from the matrix to inspect its cognitive demand contracts, main question, and instance references.</p>
        </div>
      `;
    }

    const c06 = validateC06(cell);
    const isCandidate = cell.status === 'CANDIDATE' || cell.status === 'HOLD';
    const statusLabel = isCandidate
      ? 'Candidate / Pending External Review (Unverified)'
      : 'Synthetic Verified';

    return `
      <div class="cell-detail-card active" data-cell-id="${e(cell.cell_id)}">
        <div class="detail-header">
          <span class="cell-badge ${cellState?.toLowerCase() ?? ''}">${e(cell.operation)} &middot; ${e(cell.demand_band)}</span>
          <span class="status-badge ${isCandidate ? 'unverified-candidate' : 'synthetic'}">${e(statusLabel)}</span>
          <h3>${e(cell.cell_id)}</h3>
        </div>

        <div class="detail-body">
          <section class="detail-section-group">
            <h4>Exact References</h4>
            <ul class="exact-refs-list">
              <li>
                <span class="ref-type">Topic:</span>
                <code class="exact-ref">${e(this.formatRef(cell.topic_ref))}</code>
              </li>
              <li>
                <span class="ref-type">Native Contract:</span>
                <code class="exact-ref">${e(this.formatRef(cell.native_contract_ref))}</code>
              </li>
            </ul>
          </section>

          <section class="detail-section-group">
            <h4>C06 Constraint Status</h4>
            <div class="c06-status ${c06.valid ? 'valid' : 'invalid'}">
              <span class="c06-badge">${c06.valid ? 'C06 Compliant' : 'C06 Invariant Failure'}</span>
              ${!c06.valid ? `
                <ul class="c06-errors">
                  ${c06.errors.map(err => `<li>${e(err)}</li>`).join('')}
                </ul>
              ` : `
                <p class="c06-notes">Validated 1 main task reference and ${cell.instances.length} unique instance tasks without collision.</p>
              `}
            </div>
          </section>

          <section class="detail-section-group">
            <h4>Main Task Reference</h4>
            ${cell.main ? `
              <div class="task-link-box main">
                <span class="task-type">${e(cell.main.type)}</span>
                <a
                  href="/question/${e(cell.main.id)}"
                  class="task-route-link"
                  style="min-height: 48px; display: inline-flex; align-items: center;"
                >
                  ${e(cell.main.id)} &rarr;
                </a>
                <code class="exact-ref-sub">${e(this.formatRef(cell.main))}</code>
              </div>
            ` : `
              <p class="missing-task-alert">No main task assigned (Required by C06 v1.1).</p>
            `}
          </section>

          <section class="detail-section-group">
            <h4>Instance Task References (${cell.instances.length})</h4>
            ${cell.instances.length > 0 ? `
              <ul class="instances-list">
                ${cell.instances.map((inst, idx) => `
                  <li class="instance-item">
                    <a
                      href="/question/${e(inst.id)}"
                      class="instance-route-link"
                      style="min-height: 48px; display: flex; align-items: center;"
                    >
                      <span class="inst-index">#${idx + 1}</span>
                      <span class="inst-id">${e(inst.id)}</span>
                    </a>
                    <code class="exact-ref-sub">${e(this.formatRef(inst))}</code>
                  </li>
                `).join('')}
              </ul>
            ` : `
              <p class="empty-instances-note">No instance tasks assigned.</p>
            `}
          </section>
        </div>
      </div>
    `;
  }

  private formatRef(ref: Ref): string {
    return `${ref.type}:${ref.id}#r${ref.revision || 1}`;
  }
}
