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
  if(points.length<2||points.some(p=>!Number.isFinite(p.x)||!Number.isFinite(p.y)))return null;
  const n=points.length,x0=points[0].x,y0=points[0].y;
  const meanX=points.reduce((s,p)=>s+(p.x-x0)/n,0),meanY=points.reduce((s,p)=>s+(p.y-y0)/n,0);
  let xx=0,xy=0,yy=0;
  for(const p of points){const x=p.x-x0-meanX,y=p.y-y0-meanY;xx+=x*x;xy+=x*y;yy+=y*y;}
  if(!(xx>0)||!Number.isFinite(xx)||!(yy>0)||!Number.isFinite(yy))return null;
  const slope=xy/xx,intercept=(y0+meanY)-slope*(x0+meanX);
  const residual=points.reduce((s,p)=>s+((p.y-y0-meanY)-slope*(p.x-x0-meanX))**2,0);
  const rSquared=Math.max(0,Math.min(1,1-residual/yy));
  if(![slope,intercept,rSquared,residual].every(Number.isFinite))return null;
  const result:BestFitLine={slope,intercept,rSquared};
  if(n>2){const sigma=Math.sqrt(residual/(n-2)),su=sigma/Math.sqrt(xx),iu=sigma*Math.hypot(1/Math.sqrt(n),(x0+meanX)/Math.sqrt(xx));if(!Number.isFinite(su)||!Number.isFinite(iu))return null;return {...result,slopeUncertainty:su,interceptUncertainty:iu};}
  return result;

}

/**
 * Propagates independent uncertainties in quadrature: delta_total = sqrt(sum(delta_i^2)).
 */
export function propagateQuadratureUncertainty(uncertainties: readonly number[]): number {
  if(uncertainties.some(u=>!Number.isFinite(u)||u<0))throw Error('Invalid measurement uncertainty');
  const total=uncertainties.reduce((s,u)=>Math.hypot(s,u),0);if(!Number.isFinite(total))throw Error('Uncertainty overflow');return total;

}

/**
 * Computes tight coordinate bounds covering all given points, with optional margin.
 */
export function computeDataBounds(
  points: readonly GraphDataPoint[],
  marginFraction: number = 0.1
): { xMin: number; xMax: number; yMin: number; yMax: number } {
  if(!Number.isFinite(marginFraction)||marginFraction<0||points.some(p=>!Number.isFinite(p.x)||!Number.isFinite(p.y)||[p.xUncertainty,p.yUncertainty].some(u=>u!==undefined&&(!Number.isFinite(u)||u<0))))throw Error('Invalid graph data');const valid=points;

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
  if(!Number.isFinite(factor)||factor<=0||center&&(!Number.isFinite(center.x)||!Number.isFinite(center.y)))throw Error('Invalid zoom');
  const clampedFactor = Math.max(0.2, Math.min(5.0, factor));
  const newZoomLevel = Math.max(0.1, Math.min(20.0, state.zoomLevel * clampedFactor));

  const centerX = center ? center.x : (state.xMin + state.xMax) / 2;
  const centerY = center ? center.y : (state.yMin + state.yMax) / 2;

  const effective=newZoomLevel/state.zoomLevel;
  const width=(state.xMax-state.xMin)/effective,height=(state.yMax-state.yMin)/effective;

  return {
    xMin: centerX - width / 2,
    xMax: centerX + width / 2,
    yMin: centerY - height / 2,
    yMax: centerY + height / 2,
    zoomLevel:newZoomLevel,
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
  if(!Number.isFinite(dxUnits)||!Number.isFinite(dyUnits)||![state.xMin+dxUnits,state.xMax+dxUnits,state.yMin+dyUnits,state.yMax+dyUnits].every(Number.isFinite))throw Error('Invalid pan');
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
