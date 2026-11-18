/**
 * web/adapters/physics/calculations.ts
 * A29 — Experimental data calculations, linear regression, and coordinate transforms.
 *
 * Implements:
 * - Least-squares linear regression (y = mx + c) with correlation coefficient (R^2).
 * - Slope and intercept standard errors (uncertainties).
 * - Quadrature uncertainty propagation for independent measurement errors.
 * - Screen-to-data and data-to-screen coordinate mapping with zoom and pan transforms.
 *
 * No academic approval inferred from software validation.
 */

import type { BestFitLine, GraphDataPoint, GraphViewState } from './types.ts';

/**
 * Computes least-squares linear regression line (y = mx + c) for a set of data points.
 */
export function computeBestFitLine(points: readonly GraphDataPoint[]): BestFitLine | null {
  const validPoints = points.filter(
    (p) =>
      Number.isFinite(p.x) &&
      Number.isFinite(p.y) &&
      !Number.isNaN(p.x) &&
      !Number.isNaN(p.y)
  );

  const n = validPoints.length;
  if (n < 2) return null;

  let sumX = 0;
  let sumY = 0;
  let sumXY = 0;
  let sumXX = 0;
  let sumYY = 0;

  for (const p of validPoints) {
    sumX += p.x;
    sumY += p.y;
    sumXY += p.x * p.y;
    sumXX += p.x * p.x;
    sumYY += p.y * p.y;
  }

  const denominator = n * sumXX - sumX * sumX;
  if (Math.abs(denominator) < 1e-12) {
    // Vertical line or identical X coordinates
    return null;
  }

  const slope = (n * sumXY - sumX * sumY) / denominator;
  const intercept = (sumY - slope * sumX) / n;

  // Compute R^2 (coefficient of determination)
  const meanY = sumY / n;
  let ssTot = 0;
  let ssRes = 0;

  for (const p of validPoints) {
    const yPred = slope * p.x + intercept;
    ssTot += Math.pow(p.y - meanY, 2);
    ssRes += Math.pow(p.y - yPred, 2);
  }

  const rSquared = ssTot > 1e-12 ? Math.max(0, Math.min(1, 1 - ssRes / ssTot)) : 1;

  // Compute slope and intercept standard error if n > 2
  let slopeUncertainty: number | undefined;
  let interceptUncertainty: number | undefined;

  if (n > 2) {
    const sResidual = Math.sqrt(ssRes / (n - 2));
    const sxx = sumXX - (sumX * sumX) / n;
    if (sxx > 1e-12) {
      slopeUncertainty = Math.round((sResidual / Math.sqrt(sxx)) * 10000) / 10000;
      interceptUncertainty =
        Math.round((sResidual * Math.sqrt(sumXX / (n * sxx))) * 10000) / 10000;
    }
  }

  return {
    slope: Math.round(slope * 10000) / 10000,
    intercept: Math.round(intercept * 10000) / 10000,
    rSquared: Math.round(rSquared * 10000) / 10000,
    slopeUncertainty,
    interceptUncertainty,
  };
}

/**
 * Propagates independent uncertainties in quadrature: delta_total = sqrt(sum(delta_i^2)).
 */
export function propagateQuadratureUncertainty(uncertainties: readonly number[]): number {
  let sumSq = 0;
  for (const u of uncertainties) {
    if (Number.isFinite(u) && u > 0) {
      sumSq += u * u;
    }
  }
  return Math.round(Math.sqrt(sumSq) * 1000) / 1000;
}

/**
 * Computes tight coordinate bounds covering all given points, with optional margin.
 */
export function computeDataBounds(
  points: readonly GraphDataPoint[],
  marginFraction: number = 0.1
): { xMin: number; xMax: number; yMin: number; yMax: number } {
  const valid = points.filter(
    (p) => Number.isFinite(p.x) && Number.isFinite(p.y)
  );

  if (valid.length === 0) {
    return { xMin: 0, xMax: 10, yMin: 0, yMax: 10 };
  }

  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  for (const p of valid) {
    const xErr = p.xUncertainty || 0;
    const yErr = p.yUncertainty || 0;
    minX = Math.min(minX, p.x - xErr);
    maxX = Math.max(maxX, p.x + xErr);
    minY = Math.min(minY, p.y - yErr);
    maxY = Math.max(maxY, p.y + yErr);
  }

  const rangeX = maxX - minX || 1;
  const rangeY = maxY - minY || 1;

  return {
    xMin: minX - rangeX * marginFraction,
    xMax: maxX + rangeX * marginFraction,
    yMin: minY - rangeY * marginFraction,
    yMax: maxY + rangeY * marginFraction,
  };
}

/**
 * Applies a zoom scaling transformation centered on a coordinate.
 */
export function applyZoom(
  state: GraphViewState,
  factor: number, // > 1 zooms in, < 1 zooms out
  center?: { x: number; y: number }
): GraphViewState {
  const clampedFactor = Math.max(0.2, Math.min(5.0, factor));
  const newZoomLevel = Math.max(0.1, Math.min(20.0, state.zoomLevel * clampedFactor));

  const centerX = center ? center.x : (state.xMin + state.xMax) / 2;
  const centerY = center ? center.y : (state.yMin + state.yMax) / 2;

  const width = (state.xMax - state.xMin) / clampedFactor;
  const height = (state.yMax - state.yMin) / clampedFactor;

  return {
    xMin: centerX - width / 2,
    xMax: centerX + width / 2,
    yMin: centerY - height / 2,
    yMax: centerY + height / 2,
    zoomLevel: Math.round(newZoomLevel * 100) / 100,
    panOffset: state.panOffset,
  };
}

/**
 * Applies a pan offset translation.
 */
export function applyPan(
  state: GraphViewState,
  dxUnits: number,
  dyUnits: number
): GraphViewState {
  return {
    xMin: state.xMin + dxUnits,
    xMax: state.xMax + dxUnits,
    yMin: state.yMin + dyUnits,
    yMax: state.yMax + dyUnits,
    zoomLevel: state.zoomLevel,
    panOffset: {
      x: state.panOffset.x + dxUnits,
      y: state.panOffset.y + dyUnits,
    },
  };
}
