/**
 * web/adapters/physics/types.ts
 * A29 — Physics and experimental workspace domain contracts.
 *
 * Implements:
 * - PHY_E1, PHY_E2, PHY_E3 exam archetypes (NSEP, INPhO, IPhO experimental/theoretical)
 * - Scientific data tables with uncertainties and units
 * - Coordinate graphing with error bars, zoom/pan transforms, and best-fit regression
 * - Apparatus descriptions and empirical observation logs
 * - Mandatory invariant: Experimental performance in a software simulator NEVER
 *   certifies physical laboratory competence or hands-on apparatus safety.
 * - E3 evaluations strictly default to REVIEW_PENDING with score claims withheld (points: null).
 *
 * No academic approval inferred from software validation.
 */

export type PhysExamArchetype = 'PHY_E1' | 'PHY_E2' | 'PHY_E3' | 'CHEM_E3';

export interface DataColumn {
  readonly id: string;
  readonly name: string;
  readonly symbol: string;
  readonly unit: string;
  readonly uncertainty?: number;
  readonly isIndependent?: boolean;
}

export type DataRow = Record<string, number | null>;

export interface DataTableData {
  readonly columns: readonly DataColumn[];
  readonly rows: readonly DataRow[];
  readonly title?: string;
}

export interface GraphAxis {
  readonly label: string;
  readonly symbol: string;
  readonly unit: string;
  readonly min: number;
  readonly max: number;
  readonly scale?: 'linear' | 'log';
}

export interface GraphDataPoint {
  readonly x: number;
  readonly y: number;
  readonly xUncertainty?: number;
  readonly yUncertainty?: number;
  readonly label?: string;
}

export interface BestFitLine {
  readonly slope: number;
  readonly intercept: number;
  readonly rSquared: number;
  readonly slopeUncertainty?: number;
  readonly interceptUncertainty?: number;
}

export interface GraphSeries {
  readonly id: string;
  readonly name: string;
  readonly dataPoints: readonly GraphDataPoint[];
  readonly color?: string;
  readonly style?: 'scatter' | 'line' | 'scatter-line';
  readonly bestFitLine?: BestFitLine;
}

export interface GraphViewState {
  readonly xMin: number;
  readonly xMax: number;
  readonly yMin: number;
  readonly yMax: number;
  readonly zoomLevel: number;
  readonly panOffset: { readonly x: number; readonly y: number };
}

export interface ApparatusComponent {
  readonly id: string;
  readonly name: string;
  readonly type: string;
  readonly specifications?: string;
  readonly uncertaintyResolution?: string;
  readonly accessibleDescription: string;
}

export interface ObservationRecord {
  readonly id: string;
  readonly timestamp: string;
  readonly stepNumber: number;
  readonly notes: string;
  readonly readings: Record<string, number>;
  readonly qualitativeObservations?: string;
}

export interface ExperimentDraft {
  readonly archetype: PhysExamArchetype;
  readonly title: string;
  readonly apparatus: readonly ApparatusComponent[];
  readonly table: DataTableData;
  readonly graph: {
    readonly xAxis: GraphAxis;
    readonly yAxis: GraphAxis;
    readonly series: readonly GraphSeries[];
    readonly viewState: GraphViewState;
  };
  readonly observations: readonly ObservationRecord[];
  readonly conclusion?: string;
  readonly revision: number;
  readonly lastModifiedAt: string;
}

export interface ExperimentEvaluationRubricCriterion {
  readonly name: string;
  readonly maxPoints: number;
  readonly awardedPoints: number | null;
  readonly reviewerNotes: string | null;
}

export interface ExperimentEvaluation {
  readonly status: 'REVIEW_PENDING' | 'INVALID';
  readonly points: number | null;
  readonly maxPoints: number;
  readonly feedback: string;
  readonly isAutoGraded: boolean;
  readonly labCompetenceDisclaimer: string;
  readonly rubricCriteria?: readonly ExperimentEvaluationRubricCriterion[];
}

export const LAB_COMPETENCE_DISCLAIMER =
  'No actual laboratory competence or physical equipment safety qualification is claimed, certified, or inferred from software simulator evaluation.';
