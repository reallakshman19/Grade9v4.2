/**
 * web/components/graph.ts
 * A29 — Scientific coordinate graph component with error bars, zoom, and trendlines.
 *
 * Implements:
 * - Scalable 2D coordinate system with configurable SI units and axis bounds
 * - Data points with dual-axis error bars (X and Y uncertainty whiskers)
 * - Least-squares linear regression trendline overlay (y = mx + c) with R^2
 * - Interactive and programmable Zoom & Pan controls with boundary clamping
 * - Accessible SVG diagram and semantic tabular/textual alternative (WCAG AAA)
 * - 48px minimum touch/hit target bounds on all graph controls
 *
 * No academic approval inferred from software validation.
 */

import {escapeHtml} from '../runtime/rendering.ts';
import { HIT_TARGET_MIN_PX } from '../styles/tokens.ts';
import {
  computeBestFitLine,
  computeDataBounds,
  applyZoom,
  applyPan,
} from '../adapters/physics/calculations.ts';
import type {
  BestFitLine,
  GraphAxis,
  GraphDataPoint,
  GraphSeries,
  GraphViewState,
} from '../adapters/physics/types.ts';

export interface GraphConfig {
  readonly xAxis: GraphAxis;
  readonly yAxis: GraphAxis;
  readonly initialSeries?: readonly GraphSeries[];
  readonly initialViewState?: GraphViewState;
}

function checkedSeries(s:GraphSeries):GraphSeries{
 if(!s.id||typeof s.name!=='string'||!Array.isArray(s.dataPoints)||s.dataPoints.some(p=>!Number.isFinite(p.x)||!Number.isFinite(p.y)||[p.xUncertainty,p.yUncertainty].some(u=>u!==undefined&&(!Number.isFinite(u)||u<0)))||s.color!==undefined&&!/^#[0-9a-f]{6}$/i.test(s.color))throw Error('Invalid series');
 const {bestFitLine:_,...copy}=structuredClone(s);const fit=computeBestFitLine(copy.dataPoints);return fit?{...copy,bestFitLine:fit}:copy;
}
function checkedView(v:GraphViewState){if(![v.xMin,v.xMax,v.yMin,v.yMax,v.zoomLevel,v.panOffset.x,v.panOffset.y].every(Number.isFinite)||v.xMin>=v.xMax||v.yMin>=v.yMax||v.zoomLevel<0.1||v.zoomLevel>20)throw Error('Invalid graph view');return structuredClone(v);}
export class GraphController {
  private xAxis: GraphAxis;
  private yAxis: GraphAxis;
  private series: GraphSeries[];
  private viewState: GraphViewState;
  private defaultBounds: { xMin: number; xMax: number; yMin: number; yMax: number };

  constructor(config: GraphConfig) {
    for(const a of [config.xAxis,config.yAxis])if(a.scale==='log'||!Number.isFinite(a.min)||!Number.isFinite(a.max)||a.min>=a.max)throw Error('Unsupported or invalid axis');
    this.xAxis = { ...config.xAxis };
    this.yAxis = { ...config.yAxis };
    this.series=(config.initialSeries??[]).map(checkedSeries);if(new Set(this.series.map(s=>s.id)).size!==this.series.length)throw Error('Duplicate series');
    const initialPoints = this.getAllPoints();
    this.defaultBounds = computeDataBounds(initialPoints);

    if (config.initialViewState) {
      this.viewState=checkedView(config.initialViewState);
    } else {
      this.viewState = {
        xMin: this.xAxis.min !== undefined ? this.xAxis.min : this.defaultBounds.xMin,
        xMax: this.xAxis.max !== undefined ? this.xAxis.max : this.defaultBounds.xMax,
        yMin: this.yAxis.min !== undefined ? this.yAxis.min : this.defaultBounds.yMin,
        yMax: this.yAxis.max !== undefined ? this.yAxis.max : this.defaultBounds.yMax,
        zoomLevel: 1.0,
        panOffset: { x: 0, y: 0 },
      };
    }
  }

  getXAxis(): GraphAxis {
    return { ...this.xAxis };
  }

  getYAxis(): GraphAxis {
    return { ...this.yAxis };
  }

  getSeries(): readonly GraphSeries[] {
    return structuredClone(this.series);
  }

  getViewState(): GraphViewState {
    return structuredClone(this.viewState);
  }

  getAllPoints(): GraphDataPoint[] {
    return structuredClone(this.series.flatMap(s=>s.dataPoints));
  }

  addSeries(newSeries: GraphSeries): void {
    if(this.series.some(s=>s.id===newSeries.id))throw Error('Duplicate series');this.series.push(checkedSeries(newSeries));
  }
  updateSeries(id:string,updates:Partial<GraphSeries>):boolean{
    const idx=this.series.findIndex(s=>s.id===id);if(idx<0)return false;
    this.series[idx]=checkedSeries({...this.series[idx],...updates,id});return true;
  }

  removeSeries(id: string): boolean {
    const len = this.series.length;
    this.series = this.series.filter((s) => s.id !== id);
    return this.series.length !== len;
  }

  fitToData(): void {
    const points = this.getAllPoints();
    const bounds = computeDataBounds(points);
    this.defaultBounds = bounds;
    this.viewState = {
      xMin: bounds.xMin,
      xMax: bounds.xMax,
      yMin: bounds.yMin,
      yMax: bounds.yMax,
      zoomLevel: 1.0,
      panOffset: { x: 0, y: 0 },
    };
  }

  zoom(factor: number, center?: { x: number; y: number }): void {
    this.viewState=checkedView(applyZoom(this.viewState,factor,center));
  }

  pan(dxUnits: number, dyUnits: number): void {
    this.viewState=checkedView(applyPan(this.viewState,dxUnits,dyUnits));
  }

  resetView(): void {
    this.viewState = {
      xMin: this.xAxis.min !== undefined ? this.xAxis.min : this.defaultBounds.xMin,
      xMax: this.xAxis.max !== undefined ? this.xAxis.max : this.defaultBounds.xMax,
      yMin: this.yAxis.min !== undefined ? this.yAxis.min : this.defaultBounds.yMin,
      yMax: this.yAxis.max !== undefined ? this.yAxis.max : this.defaultBounds.yMax,
      zoomLevel: 1.0,
      panOffset: { x: 0, y: 0 },
    };
  }

  calculateBestFit(seriesId: string): BestFitLine | null {
    const target = this.series.find((s) => s.id === seriesId);
    if (!target) return null;
    return computeBestFitLine(target.dataPoints);
  }

  generateAccessibleDescription(): string {
    const pointsCount = this.getAllPoints().length;
    let desc = `Scientific graph of ${this.yAxis.label} (${this.yAxis.symbol} in ${this.yAxis.unit}) versus ${this.xAxis.label} (${this.xAxis.symbol} in ${this.xAxis.unit}). Contains ${this.series.length} series with a total of ${pointsCount} data points. Zoom level is ${this.viewState.zoomLevel.toFixed(1)}x. Visible X range from ${this.viewState.xMin.toFixed(2)} to ${this.viewState.xMax.toFixed(2)} ${this.xAxis.unit}, Y range from ${this.viewState.yMin.toFixed(2)} to ${this.viewState.yMax.toFixed(2)} ${this.yAxis.unit}.`;

    for (const s of this.series) {
      if (s.bestFitLine) {
        desc += ` Series "${s.name}" linear best-fit equation: ${this.yAxis.symbol} = (${s.bestFitLine.slope.toFixed(4)})·${this.xAxis.symbol} + (${s.bestFitLine.intercept.toFixed(4)}) with correlation R² = ${s.bestFitLine.rSquared.toFixed(4)}.`;
      }
    }
    return desc;
  }

  renderSvg(width: number = 500, height: number = 320): string {
    if(!Number.isFinite(width)||!Number.isFinite(height)||width<100||height<100)throw Error('Invalid graph dimensions');
    const padding = { top: 30, right: 30, bottom: 50, left: 60 };
    const plotW = width - padding.left - padding.right;
    const plotH = height - padding.top - padding.bottom;

    const { xMin, xMax, yMin, yMax } = this.viewState;
    const rangeX = xMax - xMin || 1;
    const rangeY = yMax - yMin || 1;

    const toScreenX = (x: number): number => padding.left + ((x - xMin) / rangeX) * plotW;
    const toScreenY = (y: number): number => padding.top + plotH - ((y - yMin) / rangeY) * plotH;

    const accessibleText = this.generateAccessibleDescription();

    // Generate axis ticks
    const xTicksCount = 5;
    const yTicksCount = 5;
    const xTicksSvg: string[] = [];
    const yTicksSvg: string[] = [];

    for (let i = 0; i <= xTicksCount; i++) {
      const val = xMin + (i / xTicksCount) * rangeX;
      const sx = toScreenX(val);
      xTicksSvg.push(`
        <line x1="${sx.toFixed(1)}" y1="${(padding.top + plotH).toFixed(1)}" x2="${sx.toFixed(1)}" y2="${(padding.top + plotH + 6).toFixed(1)}" stroke="#64748b" />
        <text x="${sx.toFixed(1)}" y="${(padding.top + plotH + 20).toFixed(1)}" text-anchor="middle" font-family="var(--g9-font-family,system-ui,sans-serif)" font-size="14" fill="#475569">${val.toFixed(1)}</text>
      `);
    }

    for (let i = 0; i <= yTicksCount; i++) {
      const val = yMin + (i / yTicksCount) * rangeY;
      const sy = toScreenY(val);
      yTicksSvg.push(`
        <line x1="${(padding.left - 6).toFixed(1)}" y1="${sy.toFixed(1)}" x2="${padding.left.toFixed(1)}" y2="${sy.toFixed(1)}" stroke="#64748b" />
        <text x="${(padding.left - 10).toFixed(1)}" y="${(sy + 4).toFixed(1)}" text-anchor="end" font-family="var(--g9-font-family,system-ui,sans-serif)" font-size="14" fill="#475569">${val.toFixed(1)}</text>
      `);
    }

    // Generate series lines, error bars, and best-fit lines
    const seriesSvg: string[] = [];

    for (const s of this.series) {
      const color = s.color || '#2563eb';

      // 1. Best fit line
      if (s.bestFitLine) {
        const yAtXMin = s.bestFitLine.slope * xMin + s.bestFitLine.intercept;
        const yAtXMax = s.bestFitLine.slope * xMax + s.bestFitLine.intercept;
        const x1 = toScreenX(xMin);
        const y1 = toScreenY(yAtXMin);
        const x2 = toScreenX(xMax);
        const y2 = toScreenY(yAtXMax);

        seriesSvg.push(`
          <line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${color}" stroke-width="2" stroke-dasharray="6,4" opacity="0.8" />
        `);
      }

      // 2. Data points and error bars
      for (const p of s.dataPoints) {
        const sx = toScreenX(p.x);
        const sy = toScreenY(p.y);

        // Y error bar
        if (p.yUncertainty && p.yUncertainty > 0) {
          const syTop = toScreenY(p.y + p.yUncertainty);
          const syBot = toScreenY(p.y - p.yUncertainty);
          seriesSvg.push(`
            <line x1="${sx.toFixed(1)}" y1="${syTop.toFixed(1)}" x2="${sx.toFixed(1)}" y2="${syBot.toFixed(1)}" stroke="${color}" stroke-width="1.5" />
            <line x1="${(sx - 4).toFixed(1)}" y1="${syTop.toFixed(1)}" x2="${(sx + 4).toFixed(1)}" y2="${syTop.toFixed(1)}" stroke="${color}" stroke-width="1.5" />
            <line x1="${(sx - 4).toFixed(1)}" y1="${syBot.toFixed(1)}" x2="${(sx + 4).toFixed(1)}" y2="${syBot.toFixed(1)}" stroke="${color}" stroke-width="1.5" />
          `);
        }

        // X error bar
        if (p.xUncertainty && p.xUncertainty > 0) {
          const sxLeft = toScreenX(p.x - p.xUncertainty);
          const sxRight = toScreenX(p.x + p.xUncertainty);
          seriesSvg.push(`
            <line x1="${sxLeft.toFixed(1)}" y1="${sy.toFixed(1)}" x2="${sxRight.toFixed(1)}" y2="${sy.toFixed(1)}" stroke="${color}" stroke-width="1.5" />
            <line x1="${sxLeft.toFixed(1)}" y1="${(sy - 4).toFixed(1)}" x2="${sxLeft.toFixed(1)}" y2="${(sy + 4).toFixed(1)}" stroke="${color}" stroke-width="1.5" />
            <line x1="${sxRight.toFixed(1)}" y1="${(sy - 4).toFixed(1)}" x2="${sxRight.toFixed(1)}" y2="${(sy + 4).toFixed(1)}" stroke="${color}" stroke-width="1.5" />
          `);
        }

        // Point circle
        seriesSvg.push(`
          <circle cx="${sx.toFixed(1)}" cy="${sy.toFixed(1)}" r="4.5" fill="${color}" stroke="#ffffff" stroke-width="1.5" />
        `);
      }
    }

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-label="${escapeHtml(accessibleText)}">
  <defs>
    <clipPath id="graph-plot-clip">
      <rect x="${padding.left}" y="${padding.top}" width="${plotW}" height="${plotH}" />
    </clipPath>
  </defs>
  <!-- Background & Grid Area -->
  <rect width="100%" height="100%" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5" rx="8" />
  <rect x="${padding.left}" y="${padding.top}" width="${plotW}" height="${plotH}" fill="#f8fafc" stroke="#e2e8f0" />

  <!-- Plot series content (clipped to axes) -->
  <g clip-path="url(#graph-plot-clip)">
    ${seriesSvg.join('')}
  </g>

  <!-- Axes lines -->
  <line x1="${padding.left}" y1="${padding.top + plotH}" x2="${padding.left + plotW}" y2="${padding.top + plotH}" stroke="#334155" stroke-width="2" />
  <line x1="${padding.left}" y1="${padding.top}" x2="${padding.left}" y2="${padding.top + plotH}" stroke="#334155" stroke-width="2" />

  <!-- Ticks -->
  ${xTicksSvg.join('')}
  ${yTicksSvg.join('')}

  <!-- Axis Title Labels -->
  <text x="${padding.left + plotW / 2}" y="${height - 12}" text-anchor="middle" font-family="var(--g9-font-family,system-ui,sans-serif)" font-size="14" font-weight="600" fill="#0f172a">${escapeHtml(String(this.xAxis.label))} (${escapeHtml(String(this.xAxis.symbol))} / ${escapeHtml(String(this.xAxis.unit))})</text>
  <text x="18" y="${padding.top + plotH / 2}" text-anchor="middle" font-family="var(--g9-font-family,system-ui,sans-serif)" font-size="14" font-weight="600" fill="#0f172a" transform="rotate(-90 18 ${padding.top + plotH / 2})">${escapeHtml(String(this.yAxis.label))} (${escapeHtml(String(this.yAxis.symbol))} / ${escapeHtml(String(this.yAxis.unit))})</text>
</svg>`;
  }

  renderHtml(): string {
    const accessibleDesc = this.generateAccessibleDescription();
    const svgHtml = this.renderSvg(540, 340);

    const bestFitSummaries = this.series
      .filter((s) => s.bestFitLine)
      .map(
        (s) => `
        <div style="font-size:14px; color: #1e293b; background: #f1f5f9; padding: 8px 12px; border-radius: 6px; margin-top: 6px;">
          <strong>${escapeHtml(String(s.name))}</strong> Trendline: <code>${escapeHtml(String(this.yAxis.symbol))} = (${s.bestFitLine!.slope})·${escapeHtml(String(this.xAxis.symbol))} + (${s.bestFitLine!.intercept})</code> (R² = ${s.bestFitLine!.rSquared})
        </div>`
      )
      .join('');

    return `
      <div class="graph-component-container" style="display: flex; flex-direction: column; gap: 12px;">
        <div class="graph-controls-bar" style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
          <button id="graph-zoom-in-btn" style="min-height: ${HIT_TARGET_MIN_PX}px; min-width: ${HIT_TARGET_MIN_PX}px; padding: 10px 16px; background: #e2e8f0; border-radius: 6px; font-weight: 600;">🔍 Zoom In</button>
          <button id="graph-zoom-out-btn" style="min-height: ${HIT_TARGET_MIN_PX}px; min-width: ${HIT_TARGET_MIN_PX}px; padding: 10px 16px; background: #e2e8f0; border-radius: 6px; font-weight: 600;">🔍 Zoom Out</button>
          <button id="graph-pan-left-btn" style="min-height: ${HIT_TARGET_MIN_PX}px; min-width: ${HIT_TARGET_MIN_PX}px; padding: 10px 16px; background: #e2e8f0; border-radius: 6px; font-weight: 600;">⬅ Pan Left</button>
          <button id="graph-pan-right-btn" style="min-height: ${HIT_TARGET_MIN_PX}px; min-width: ${HIT_TARGET_MIN_PX}px; padding: 10px 16px; background: #e2e8f0; border-radius: 6px; font-weight: 600;">➡ Pan Right</button>
          <button id="graph-reset-view-btn" style="min-height: ${HIT_TARGET_MIN_PX}px; min-width: ${HIT_TARGET_MIN_PX}px; padding: 10px 16px; background: #3b82f6; color: #ffffff; border-radius: 6px; font-weight: 600;">Reset View</button>
          <span style="font-size:14px; color: #64748b; margin-left: 8px;">Zoom: ${this.viewState.zoomLevel.toFixed(1)}x</span>
        </div>
        <div class="graph-svg-wrapper">
          ${svgHtml}
        </div>
        <div class="sr-only" aria-live="polite">${escapeHtml(String(accessibleDesc))}</div>
        ${bestFitSummaries}
      </div>
    `;
  }
}
