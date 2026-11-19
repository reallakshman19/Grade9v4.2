/**
 * web/components/experiment.ts
 * A29 — Experimental and graph workspace component controller.
 *
 * Implements:
 * - Apparatus component inventory with resolution and uncertainty specifications
 * - Scientific data table integration with column metadata and cell validation
 * - Coordinate graphing with error bars, interactive zoom & pan, and trendlines
 * - Observation logging and experimental conclusion derivation
 * - Exact dataset persistence and restoration roundtrip
 * - Strict pedagogical invariant: PHY E3 / CHEM E3 work is NEVER auto-graded (points: null, REVIEW_PENDING)
 * - Explicit lab competence disclaimer: Software simulator performance does not certify
 *   physical laboratory competence or hands-on equipment safety.
 * - 48px minimum touch/hit target size across all tabs, buttons, and inputs.
 *
 * No academic approval inferred from software validation.
 */

import {escapeHtml} from '../runtime/rendering.ts';
import {canonicalJson,computeSha256} from '../runtime/loader.ts';
import type {WorkArtifact,Json} from '../runtime/types.ts';
import { HIT_TARGET_MIN_PX } from '../styles/tokens.ts';
import { DataTableController } from './data-table.ts';
import { GraphController } from './graph.ts';
import { LAB_COMPETENCE_DISCLAIMER } from '../adapters/physics/types.ts';
import type {
  ApparatusComponent,
  ExperimentDraft,
  ExperimentEvaluation,
  ObservationRecord,
  PhysExamArchetype,
  DataTableData,
  GraphAxis,
  GraphSeries,
  GraphViewState,
} from '../adapters/physics/types.ts';

export type ExperimentWorkspaceTab = 'TABLE' | 'GRAPH' | 'APPARATUS' | 'OBSERVATIONS';

export interface ExperimentWorkspaceConfig {
  readonly archetype: PhysExamArchetype;
  readonly title: string;
  readonly apparatus?: readonly ApparatusComponent[];
  readonly table?: DataTableData;
  readonly graph?: {
    readonly xAxis: GraphAxis;
    readonly yAxis: GraphAxis;
    readonly initialSeries?: readonly GraphSeries[];
    readonly initialViewState?: GraphViewState;
  };
  readonly observations?: readonly ObservationRecord[];
  readonly conclusion?: string;
  readonly maxPoints?: number;
}

export interface ExperimentViewState {
  readonly archetype: PhysExamArchetype;
  readonly title: string;
  readonly activeTab: ExperimentWorkspaceTab;
  readonly apparatus: readonly ApparatusComponent[];
  readonly table: DataTableData;
  readonly graphSeriesCount: number;
  readonly graphViewState: GraphViewState;
  readonly observations: readonly ObservationRecord[];
  readonly conclusion: string;
  readonly evaluation: ExperimentEvaluation | null;
  readonly labCompetenceDisclaimer: string;
  readonly minHitTargetPx: number;
}

export class ExperimentWorkspaceController {
  private archetype: PhysExamArchetype;
  private title: string;
  private activeTab: ExperimentWorkspaceTab = 'TABLE';
  private tableController: DataTableController;
  private graphController: GraphController;
  private apparatus: ApparatusComponent[];
  private observations: ObservationRecord[];
  private conclusion: string;
  private maxPoints: number;
  private revision: number = 1;
  private evaluation: ExperimentEvaluation | null = null;

  constructor(config: ExperimentWorkspaceConfig) {
    this.archetype = config.archetype;
    this.title = config.title;
    this.apparatus = structuredClone(config.apparatus??[]) as ApparatusComponent[];
    this.observations = structuredClone(config.observations??[]) as ObservationRecord[];
    this.conclusion = config.conclusion || '';
    this.maxPoints = config.maxPoints ?? 10;

    this.tableController = new DataTableController(config.table);

    const defaultXAxis: GraphAxis = config.graph?.xAxis || {
      label: 'Length',
      symbol: 'L',
      unit: 'm',
      min: 0,
      max: 2,
    };
    const defaultYAxis: GraphAxis = config.graph?.yAxis || {
      label: 'Period Squared',
      symbol: 'T²',
      unit: 's²',
      min: 0,
      max: 8,
    };

    this.graphController = new GraphController({
      xAxis: defaultXAxis,
      yAxis: defaultYAxis,
      initialSeries: config.graph?.initialSeries,
      initialViewState: config.graph?.initialViewState,
    });
  }

  // --- Tab Management ---

  getActiveTab(): ExperimentWorkspaceTab {
    return this.activeTab;
  }

  setActiveTab(tab: ExperimentWorkspaceTab): void {
    this.activeTab = tab;
  }

  // --- Sub-Controller Accessors ---

  getTableController(): DataTableController {
    return this.tableController;
  }

  getGraphController(): GraphController {
    return this.graphController;
  }

  // --- Apparatus Management ---

  getApparatus(): readonly ApparatusComponent[] {
    return structuredClone(this.apparatus);
  }

  addApparatus(item: ApparatusComponent): void {
    if(!item.id||this.apparatus.some(a=>a.id===item.id))throw Error('Duplicate apparatus');this.apparatus.push(structuredClone(item));
    this.evaluation=null;this.revision++;
  }

  removeApparatus(id: string): boolean {
    const len = this.apparatus.length;
    this.apparatus = this.apparatus.filter((a) => a.id !== id);
    if (this.apparatus.length !== len) {
      this.evaluation=null;this.revision++;
      return true;
    }
    return false;
  }

  // --- Observations Management ---

  getObservations(): readonly ObservationRecord[] {
    return structuredClone(this.observations);
  }

  addObservation(record: Omit<ObservationRecord, 'id' | 'stepNumber' | 'timestamp'>): ObservationRecord {
    const newRecord: ObservationRecord = {
      ...structuredClone(record),
      id: `obs-${crypto.randomUUID()}`,
      stepNumber: this.observations.length + 1,
      timestamp: new Date().toISOString(),
    };
    if(Object.values(newRecord.readings).some(v=>!Number.isFinite(v)))throw Error('Invalid observation');this.observations.push(newRecord);
    this.evaluation=null;this.revision++;
    return structuredClone(newRecord);
  }

  // --- Conclusion ---

  getConclusion(): string {
    return this.conclusion;
  }

  setConclusion(text: string): void {
    this.conclusion = text;
    this.evaluation=null;this.revision++;
  }

  // --- Synchronization between Table and Graph ---

  /**
   * Syncs columns from the data table into a named graph series with automatic error bars.
   */
  syncTableToGraph(xColumnId: string, yColumnId: string, seriesName: string = 'Experimental Data'): void {
    const cols=this.tableController.getColumns(),x=cols.find(c=>c.id===xColumnId),y=cols.find(c=>c.id===yColumnId);
    if(!x||!y||x.id===y.id)throw Error('Invalid graph column binding');
    const points=this.tableController.extractSeriesPoints(xColumnId,yColumnId),id='series:'+xColumnId+':'+yColumnId;
    const old=this.graphController.getSeries().filter(s=>s.id!==id);
    this.graphController=new GraphController({xAxis:{label:x.name,symbol:x.symbol,unit:x.unit,min:0,max:1},yAxis:{label:y.name,symbol:y.symbol,unit:y.unit,min:0,max:1},initialSeries:[]});
    // One exact axis binding per graph; do not retain series measured in other units.
    this.graphController.addSeries({id,name:seriesName,dataPoints:points,style:'scatter',color:'#2563eb'});
    this.graphController.fitToData();
    this.evaluation=null;this.revision++;
  }

  // --- Dataset Persistence and Restoration (Roundtrip) ---

  exportDraft(): ExperimentDraft {
    return {
      archetype: this.archetype,
      title: this.title,
      apparatus: structuredClone(this.apparatus),
      table: this.tableController.exportData(),
      graph: {
        xAxis: this.graphController.getXAxis(),
        yAxis: this.graphController.getYAxis(),
        series: this.graphController.getSeries(),
        viewState: this.graphController.getViewState(),
      },
      observations: structuredClone(this.observations),
      conclusion: this.conclusion,
      revision: this.revision,
      lastModifiedAt: new Date().toISOString(),
    };
  }

  restoreDraft(draft: ExperimentDraft): void {
    if(draft.archetype!==this.archetype||draft.title!==this.title||!Number.isSafeInteger(draft.revision)||draft.revision<1||!Array.isArray(draft.apparatus)||!Array.isArray(draft.observations)||new Set(draft.observations.map(o=>o.id)).size!==draft.observations.length||draft.observations.some(o=>!o.id||!Number.isFinite(Date.parse(o.timestamp))||Object.values(o.readings).some(v=>!Number.isFinite(v))))throw Error('Foreign or invalid experiment draft');
    const nextTable=new DataTableController(draft.table),nextGraph=new GraphController({xAxis:draft.graph.xAxis,yAxis:draft.graph.yAxis,initialSeries:draft.graph.series,initialViewState:draft.graph.viewState});
    this.tableController=nextTable;this.graphController=nextGraph;this.apparatus=structuredClone(draft.apparatus) as ApparatusComponent[];this.observations=structuredClone(draft.observations) as ObservationRecord[];this.conclusion=draft.conclusion??'';this.revision=draft.revision;this.evaluation=null;
  }
  async toWorkArtifact(sessionId:string):Promise<WorkArtifact>{
    if(!sessionId.trim())throw Error('Session identity required');
    const {lastModifiedAt:_,...draft}=this.exportDraft();const value=JSON.parse(JSON.stringify(draft)) as Json;
    return {id:'experiment:'+await computeSha256(canonicalJson({sessionId,value})),kind:'TABLE',version:1,value};
  }

  // --- Pedagogical Invariant & Evaluation ---

  /**
   * Strict acceptance invariant:
   * PHY E3 and CHEM E3 experimental submissions are NEVER auto-graded.
   * Score claims are strictly withheld (points: null, status: 'REVIEW_PENDING').
   * Evaluation explicitly includes the required lab competence disclaimer.
   */
  evaluate(): ExperimentEvaluation {
    const evaluation: ExperimentEvaluation = {
      status: 'REVIEW_PENDING',
      points: null,
      maxPoints: this.maxPoints,
      feedback:
        'Experimental data tables, uncertainty bounds, and graph regression models require human domain evaluation. Score withheld.',
      isAutoGraded: false,
      labCompetenceDisclaimer: LAB_COMPETENCE_DISCLAIMER,
      rubricCriteria: [
        { name: 'Empirical Data Precision & Uncertainty Propagation', maxPoints: 4, awardedPoints: null, reviewerNotes: null },
        { name: 'Coordinate Graphing & Least-Squares Regression', maxPoints: 4, awardedPoints: null, reviewerNotes: null },
        { name: 'Scientific Observations & Limiting-Case Deductions', maxPoints: 2, awardedPoints: null, reviewerNotes: null },
      ],
    };

    this.evaluation = evaluation;
    return evaluation;
  }

  // --- View State & HTML Rendering ---

  getViewState(): ExperimentViewState {
    return {
      archetype: this.archetype,
      title: this.title,
      activeTab: this.activeTab,
      apparatus: structuredClone(this.apparatus),
      table: this.tableController.exportData(),
      graphSeriesCount: this.graphController.getSeries().length,
      graphViewState: this.graphController.getViewState(),
      observations: structuredClone(this.observations),
      conclusion: this.conclusion,
      evaluation: structuredClone(this.evaluation),
      labCompetenceDisclaimer: LAB_COMPETENCE_DISCLAIMER,
      minHitTargetPx: HIT_TARGET_MIN_PX,
    };
  }

  render(): string {
    const state = this.getViewState();

    const tabsHtml = `
      <div class="exp-tabs" role="tablist" style="display: flex; gap: 8px; margin-bottom: 16px;">
        <button role="tab" aria-selected="${state.activeTab === 'TABLE'}" class="exp-tab-btn" data-tab="TABLE" style="min-height: ${HIT_TARGET_MIN_PX}px; min-width: ${HIT_TARGET_MIN_PX}px; padding: 12px 20px; font-weight: 600;">Data Table</button>
        <button role="tab" aria-selected="${state.activeTab === 'GRAPH'}" class="exp-tab-btn" data-tab="GRAPH" style="min-height: ${HIT_TARGET_MIN_PX}px; min-width: ${HIT_TARGET_MIN_PX}px; padding: 12px 20px; font-weight: 600;">Graph (${state.graphSeriesCount} series)</button>
        <button role="tab" aria-selected="${state.activeTab === 'APPARATUS'}" class="exp-tab-btn" data-tab="APPARATUS" style="min-height: ${HIT_TARGET_MIN_PX}px; min-width: ${HIT_TARGET_MIN_PX}px; padding: 12px 20px; font-weight: 600;">Apparatus (${state.apparatus.length})</button>
        <button role="tab" aria-selected="${state.activeTab === 'OBSERVATIONS'}" class="exp-tab-btn" data-tab="OBSERVATIONS" style="min-height: ${HIT_TARGET_MIN_PX}px; min-width: ${HIT_TARGET_MIN_PX}px; padding: 12px 20px; font-weight: 600;">Observations (${state.observations.length})</button>
      </div>
    `;

    let paneHtml = '';

    if (state.activeTab === 'TABLE') {
      paneHtml = `
        <div class="exp-pane-table" role="tabpanel">
          ${this.tableController.renderHtml()}
        </div>
      `;
    } else if (state.activeTab === 'GRAPH') {
      paneHtml = `
        <div class="exp-pane-graph" role="tabpanel">
          ${this.graphController.renderHtml()}
        </div>
      `;
    } else if (state.activeTab === 'APPARATUS') {
      const apparatusList = state.apparatus
        .map(
          (a) => `
          <li style="padding: 12px; border: 1px solid #e2e8f0; border-radius: 6px; margin-bottom: 8px;">
            <div style="font-weight: 600; color: #0f172a;">${escapeHtml(String(a.name))} (${escapeHtml(String(a.type))})</div>
            ${a.specifications ? `<div style="font-size: 13px; color: #475569;">Specs: ${escapeHtml(String(a.specifications))}</div>` : ''}
            ${a.uncertaintyResolution ? `<div style="font-size: 13px; color: #2563eb;">Resolution: ${escapeHtml(String(a.uncertaintyResolution))}</div>` : ''}
            <div style="font-size: 12px; color: #64748b; margin-top: 4px;">${escapeHtml(String(a.accessibleDescription))}</div>
          </li>`
        )
        .join('');

      paneHtml = `
        <div class="exp-pane-apparatus" role="tabpanel">
          <ul style="list-style: none; padding: 0;">
            ${apparatusList || '<p style="color: #64748b;">No apparatus components catalogued.</p>'}
          </ul>
        </div>
      `;
    } else if (state.activeTab === 'OBSERVATIONS') {
      const obsList = state.observations
        .map(
          (o) => `
          <li style="padding: 12px; border: 1px solid #e2e8f0; border-radius: 6px; margin-bottom: 8px;">
            <div style="font-weight: 600;">Step ${o.stepNumber} (${new Date(o.timestamp).toLocaleTimeString()})</div>
            <p style="margin: 6px 0; color: #1e293b;">${escapeHtml(String(o.notes))}</p>
            ${o.qualitativeObservations ? `<div style="font-size: 13px; color: #475569;">Qualitative: ${escapeHtml(String(o.qualitativeObservations))}</div>` : ''}
          </li>`
        )
        .join('');

      paneHtml = `
        <div class="exp-pane-observations" role="tabpanel">
          <ul style="list-style: none; padding: 0;">
            ${obsList || '<p style="color: #64748b;">No observations logged yet.</p>'}
          </ul>
        </div>
      `;
    }

    const disclaimerBanner = `
      <div class="lab-competence-disclaimer" style="margin-top: 20px; padding: 12px 16px; background: #fffbeb; border: 1px solid #fef08a; border-radius: 6px; font-size: 12px; color: #854d0e;">
        <strong>Safety & Competence Notice:</strong> ${escapeHtml(String(state.labCompetenceDisclaimer))}
      </div>
    `;

    return `
      <section class="experiment-workspace" aria-label="Experimental and Graph Workspace" data-archetype="${escapeHtml(String(state.archetype))}">
        <h2 style="font-size: 18px; margin-top: 0; margin-bottom: 12px;">${escapeHtml(String(state.title))}</h2>
        ${tabsHtml}
        ${paneHtml}
        ${disclaimerBanner}
      </section>
    `;
  }
}

