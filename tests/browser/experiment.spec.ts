/**
 * tests/browser/experiment.spec.ts
 * A29 — Experimental and graph workspace test suite.
 *
 * Verifies:
 * - Scientific data table editing, cell validation, and uncertainty preservation
 * - Least-squares linear regression (y = mx + c), R^2, and error calculations
 * - Graph controller coordinate scaling, dual-axis error bars, zoom, and pan
 * - Apparatus catalogue and observation record logging
 * - Data table to graph series synchronization
 * - Full dataset export and restoration roundtrip without data loss
 * - Mandatory invariant: PHY E3/CHEM E3 work is NEVER auto-graded (points: null, REVIEW_PENDING)
 * - Mandatory lab competence disclaimer: No hands-on lab competence claimed
 * - 48px minimum hit target bounds
 *
 * No academic approval inferred from software validation.
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import {
  computeBestFitLine,
  propagateQuadratureUncertainty,
  computeDataBounds,
  applyZoom,
  applyPan,
} from '../../web/adapters/physics/calculations.ts';
import {
  LAB_COMPETENCE_DISCLAIMER,
} from '../../web/adapters/physics/types.ts';
import { DataTableController } from '../../web/components/data-table.ts';
import { GraphController } from '../../web/components/graph.ts';
import { ExperimentWorkspaceController } from '../../web/components/experiment.ts';

describe('A29 Physics Calculations: Regression & Uncertainty', () => {
  it('computes exact least-squares linear regression (y = mx + c) and R^2', () => {
    // Exact linear line: y = 2.5x + 1.0
    const points = [
      { x: 1.0, y: 3.5 },
      { x: 2.0, y: 6.0 },
      { x: 3.0, y: 8.5 },
      { x: 4.0, y: 11.0 },
      { x: 5.0, y: 13.5 },
    ];

    const regression = computeBestFitLine(points);
    assert.ok(regression);
    assert.equal(regression.slope, 2.5);
    assert.equal(regression.intercept, 1.0);
    assert.equal(regression.rSquared, 1.0);
  });

  it('calculates slope and intercept uncertainties for noisy experimental data', () => {
    // Experimental pendulum data: length (m) vs period squared (s^2)
    const points = [
      { x: 0.2, y: 0.81 },
      { x: 0.4, y: 1.62 },
      { x: 0.6, y: 2.45 },
      { x: 0.8, y: 3.22 },
      { x: 1.0, y: 4.05 },
    ];

    const regression = computeBestFitLine(points);
    assert.ok(regression);
    assert.ok(regression.slope > 3.9 && regression.slope < 4.2);
    assert.ok(regression.rSquared > 0.99);
    assert.ok(regression.slopeUncertainty !== undefined && regression.slopeUncertainty > 0);
  });

  it('propagates independent measurement uncertainties in quadrature', () => {
    // sqrt(0.03^2 + 0.04^2) = 0.05
    const combined = propagateQuadratureUncertainty([0.03, 0.04]);
    assert.equal(combined, 0.05);

    // Single value
    assert.equal(propagateQuadratureUncertainty([0.02]), 0.02);
  });

  it('computes tight data bounds covering error bars with margin', () => {
    const points = [
      { x: 2.0, y: 10.0, xUncertainty: 0.5, yUncertainty: 1.0 },
      { x: 6.0, y: 30.0, xUncertainty: 0.5, yUncertainty: 1.0 },
    ];

    const bounds = computeDataBounds(points, 0.1);
    // minX: 2.0 - 0.5 = 1.5, maxX: 6.0 + 0.5 = 6.5 -> range 5.0 -> margin 0.5 -> xMin 1.0, xMax 7.0
    assert.equal(bounds.xMin, 1.0);
    assert.equal(bounds.xMax, 7.0);
    // minY: 10 - 1 = 9, maxY: 30 + 1 = 31 -> range 22 -> margin 2.2 -> yMin 6.8, yMax 33.2
    assert.equal(bounds.yMin, 6.8);
    assert.equal(bounds.yMax, 33.2);
  });

  it('applies zoom scaling and pan translations correctly', () => {
    const initialView = {
      xMin: 0,
      xMax: 10,
      yMin: 0,
      yMax: 20,
      zoomLevel: 1.0,
      panOffset: { x: 0, y: 0 },
    };

    // Zoom in 2x centered on midpoint (5, 10)
    const zoomed = applyZoom(initialView, 2.0);
    assert.equal(zoomed.zoomLevel, 2.0);
    assert.equal(zoomed.xMin, 2.5);
    assert.equal(zoomed.xMax, 7.5);
    assert.equal(zoomed.yMin, 5.0);
    assert.equal(zoomed.yMax, 15.0);

    // Pan right 2 units, down 3 units
    const panned = applyPan(zoomed, 2.0, -3.0);
    assert.equal(panned.xMin, 4.5);
    assert.equal(panned.xMax, 9.5);
    assert.equal(panned.yMin, 2.0);
    assert.equal(panned.yMax, 12.0);
    assert.equal(panned.panOffset.x, 2.0);
    assert.equal(panned.panOffset.y, -3.0);
  });
});

describe('A29 Data Table Component: Editing & Validation', () => {
  it('manages columns with units, symbols, and uncertainties', () => {
    const table = new DataTableController();
    assert.equal(table.getColumns().length, 2);

    table.addColumn({
      id: 'col-t',
      name: 'Time',
      symbol: 't',
      unit: 's',
      uncertainty: 0.05,
    });

    assert.equal(table.getColumns().length, 3);
    const added = table.getColumns().find((c) => c.id === 'col-t');
    assert.ok(added);
    assert.equal(added.unit, 's');
    assert.equal(added.uncertainty, 0.05);

    // Remove column
    assert.equal(table.removeColumn('col-t'), true);
    assert.equal(table.getColumns().length, 2);
  });

  it('handles row insertion, cell editing, and rejects non-finite values', () => {
    const table = new DataTableController();
    const rIdx = table.addRow({ 'col-x': 1.5, 'col-y': 3.75 });
    assert.equal(rIdx, 0);
    assert.equal(table.getRows()[0]!['col-x'], 1.5);

    // Valid update
    assert.equal(table.updateCell(0, 'col-x', 2.0), true);
    assert.equal(table.getRows()[0]!['col-x'], 2.0);

    // Valid null update
    assert.equal(table.updateCell(0, 'col-x', null), true);
    assert.equal(table.getRows()[0]!['col-x'], null);

    // Reject NaN and Infinity
    assert.equal(table.updateCell(0, 'col-x', NaN), false);
    assert.equal(table.updateCell(0, 'col-x', Infinity), false);
    assert.equal(table.updateCell(0, 'col-x', -Infinity), false);
  });

  it('extracts paired coordinate series with propagated uncertainties', () => {
    const table = new DataTableController({
      columns: [
        { id: 'c1', name: 'Mass', symbol: 'm', unit: 'kg', uncertainty: 0.01 },
        { id: 'c2', name: 'Force', symbol: 'F', unit: 'N', uncertainty: 0.1 },
      ],
      rows: [
        { c1: 0.5, c2: 4.9 },
        { c1: 1.0, c2: 9.8 },
        { c1: null, c2: 14.7 }, // incomplete row skipped
      ],
    });

    const points = table.extractSeriesPoints('c1', 'c2');
    assert.equal(points.length, 2);
    assert.equal(points[0]!.x, 0.5);
    assert.equal(points[0]!.y, 4.9);
    assert.equal(points[0]!.xUncertainty, 0.01);
    assert.equal(points[0]!.yUncertainty, 0.1);
  });
});

describe('A29 Graph Component: Rendering & Interaction', () => {
  it('renders SVG graph with dual-axis error bars and trendline', () => {
    const graph = new GraphController({
      xAxis: { label: 'Current', symbol: 'I', unit: 'A', min: 0, max: 5 },
      yAxis: { label: 'Voltage', symbol: 'V', unit: 'V', min: 0, max: 20 },
      initialSeries: [
        {
          id: 's1',
          name: 'Ohmic Resistor',
          color: '#2563eb',
          dataPoints: [
            { x: 1.0, y: 4.0, xUncertainty: 0.05, yUncertainty: 0.2 },
            { x: 2.0, y: 8.0, xUncertainty: 0.05, yUncertainty: 0.2 },
            { x: 3.0, y: 12.0, xUncertainty: 0.05, yUncertainty: 0.2 },
          ],
        },
      ],
    });

    const svg = graph.renderSvg(500, 300);
    assert.ok(svg.includes('xmlns="http://www.w3.org/2000/svg"'));
    assert.ok(svg.includes('role="img"'));
    assert.ok(!svg.includes('<script'));
    // Contains trendline and error bar whiskers
    assert.ok(svg.includes('stroke-dasharray="6,4"'));

    const desc = graph.generateAccessibleDescription();
    assert.match(desc, /Current \(I in A\)/);
    assert.match(desc, /Voltage \(V in V\)/);
    assert.match(desc, /linear best-fit equation/);
  });

  it('supports programmatic zoom, pan, and view reset', () => {
    const graph = new GraphController({
      xAxis: { label: 'X', symbol: 'x', unit: 'm', min: 0, max: 10 },
      yAxis: { label: 'Y', symbol: 'y', unit: 'N', min: 0, max: 10 },
    });

    const v0 = graph.getViewState();
    assert.equal(v0.zoomLevel, 1.0);

    // Zoom in
    graph.zoom(1.5);
    const v1 = graph.getViewState();
    assert.equal(v1.zoomLevel, 1.5);
    assert.ok(v1.xMax - v1.xMin < v0.xMax - v0.xMin);

    // Pan
    graph.pan(2, 3);
    const v2 = graph.getViewState();
    assert.equal(v2.panOffset.x, 2);
    assert.equal(v2.panOffset.y, 3);

    // Reset view
    graph.resetView();
    const v3 = graph.getViewState();
    assert.equal(v3.zoomLevel, 1.0);
    assert.equal(v3.panOffset.x, 0);
  });
});

describe('A29 Experiment Workspace: Invariants, Restoration & Safety', () => {
  it('enforces pedagogical invariant: PHY E3/CHEM E3 is NEVER auto-graded (points: null)', () => {
    const workspace = new ExperimentWorkspaceController({
      archetype: 'PHY_E3',
      title: 'Determination of Gravitational Acceleration using Simple Pendulum',
      table: {
        columns: [
          { id: 'c-L', name: 'Length', symbol: 'L', unit: 'm', uncertainty: 0.005 },
          { id: 'c-T2', name: 'Period Squared', symbol: 'T²', unit: 's²', uncertainty: 0.02 },
        ],
        rows: [
          { 'c-L': 0.25, 'c-T2': 1.0 },
          { 'c-L': 0.50, 'c-T2': 2.01 },
          { 'c-L': 0.75, 'c-T2': 3.02 },
          { 'c-L': 1.00, 'c-T2': 4.02 },
        ],
      },
    });

    workspace.syncTableToGraph('c-L', 'c-T2', 'Pendulum Measurements');
    workspace.setConclusion('Slope g = 4*pi^2 / m yields g = 9.81 m/s^2.');

    const evaluation = workspace.evaluate();
    assert.equal(evaluation.status, 'REVIEW_PENDING');
    assert.equal(evaluation.points, null);
    assert.equal(evaluation.isAutoGraded, false);
    assert.ok(evaluation.rubricCriteria && evaluation.rubricCriteria.length > 0);
    assert.match(evaluation.feedback, /require human domain evaluation/i);

    // Verify required lab competence disclaimer
    assert.equal(evaluation.labCompetenceDisclaimer, LAB_COMPETENCE_DISCLAIMER);
    assert.match(
      evaluation.labCompetenceDisclaimer,
      /No actual laboratory competence or physical equipment safety qualification/i
    );
  });

  it('persists and restores dataset roundtrip across orientation or lifecycle without data loss', () => {
    const workspace = new ExperimentWorkspaceController({
      archetype: 'PHY_E3',
      title: 'Hooke Law Spring Constant Calibration',
      apparatus: [
        {
          id: 'app-1',
          name: 'Helical Spring',
          type: 'Mechanical',
          specifications: 'k approx 25 N/m',
          uncertaintyResolution: '0.5 mm',
          accessibleDescription: 'Steel extension spring suspended vertically.',
        },
      ],
      table: {
        columns: [
          { id: 'c-F', name: 'Force', symbol: 'F', unit: 'N', uncertainty: 0.05 },
          { id: 'c-x', name: 'Extension', symbol: 'x', unit: 'm', uncertainty: 0.001 },
        ],
        rows: [
          { 'c-F': 0.5, 'c-x': 0.02 },
          { 'c-F': 1.0, 'c-x': 0.041 },
        ],
      },
      conclusion: 'Linear elastic behavior verified within elastic limit.',
    });

    workspace.addObservation({
      notes: 'No permanent deformation observed after unloading.',
      readings: { 'F_unload': 0, 'x_residual': 0 },
      qualitativeObservations: 'Spring returned cleanly to equilibrium index.',
    });

    const draft = workspace.exportDraft();
    assert.equal(draft.archetype, 'PHY_E3');
    assert.equal(draft.apparatus.length, 1);
    assert.equal(draft.table.rows.length, 2);
    assert.equal(draft.observations.length, 1);
    assert.equal(draft.conclusion, 'Linear elastic behavior verified within elastic limit.');

    // Restore into fresh instance
    const restored = new ExperimentWorkspaceController({
      archetype: 'CHEM_E3', // intentional mismatch to test complete overwrite
      title: 'Untitled',
    });
    restored.restoreDraft(draft);

    const state = restored.getViewState();
    assert.equal(state.archetype, 'PHY_E3');
    assert.equal(state.title, 'Hooke Law Spring Constant Calibration');
    assert.equal(state.apparatus.length, 1);
    assert.equal(state.table.rows.length, 2);
    assert.equal(state.observations.length, 1);
    assert.equal(state.conclusion, 'Linear elastic behavior verified within elastic limit.');
  });

  it('verifies 48px touch hit target compliance on all interactive elements', () => {
    const workspace = new ExperimentWorkspaceController({
      archetype: 'PHY_E3',
      title: 'Hit Target Verification',
    });

    const state = workspace.getViewState();
    assert.equal(state.minHitTargetPx, 48);

    const html = workspace.render();
    assert.ok(html.includes('min-height: 48px'));
    assert.ok(html.includes('min-width: 48px'));
    assert.ok(html.includes('role="tablist"'));
    assert.ok(html.includes('role="tabpanel"'));
  });
});
