/**
 * web/components/scientific-model.ts
 * A50 — Interactive scientific model UI component controller.
 *
 * Implements:
 * - Typed accessible controls for model parameter manipulation (sliders, inputs, increment buttons)
 * - Full keyboard navigation (Arrow keys step, Home/End min/max)
 * - State persistence across rotation, touch, and app suspension ("touch/keyboard/rotate preserve model state")
 * - Policy-filtered output disclosure ("no automatic output precommit")
 * - Synchronized visual SVG representation and accessible text descriptions
 * - 48px minimum touch/hit target bounds
 *
 * No academic approval inferred from software validation.
 */

import {escapeHtml} from '../runtime/rendering.ts';
import { HIT_TARGET_MIN_PX } from '../styles/tokens.ts';
import { getModelRegistry } from '../runtime/models.ts';
import type {
  ScientificModelAdapter,
  ModelInteractionState,
} from '../adapters/physics/models/types.ts';
import type {
  CognitiveStage,
  PolicyFilteredEvaluationResult,
} from '../runtime/models.ts';

export interface ScientificModelConfig {
  readonly modelIdOrFamily: string;
  readonly stage?: CognitiveStage;
  readonly allowedCapabilities?: readonly string[];
  readonly initialParameters?: Record<string, number>;
}

export interface ModelViewState {
  readonly modelId: string;
  readonly modelName: string;
  readonly stage: CognitiveStage;
  readonly parameters: Record<string, number>;
  readonly evaluation: PolicyFilteredEvaluationResult;
  readonly diagramSvg: string;
  readonly accessibleDescription: string;
  readonly minHitTargetPx: number;
}

export class ScientificModelController {
  private adapter: ScientificModelAdapter;
  private stage: CognitiveStage;
  private allowedCapabilities: string[];
  private parameterValues: Record<string, number> = {};
  private revision: number = 1;

  constructor(config: ScientificModelConfig) {
    const registry = getModelRegistry();
    const found = registry.get(config.modelIdOrFamily) || registry.getByFamily(config.modelIdOrFamily);

    if (!found) {
      throw new Error(`Scientific model "${config.modelIdOrFamily}" not found in registry.`);
    }

    this.adapter = found;
    this.stage = config.stage || 'ATTEMPT';
    if(!['PREDICT','ATTEMPT','RECONSTRUCT','DIAGNOSE','REPAIR','BOUNDARY_TEST','COMPLETE'].includes(this.stage))throw Error('Invalid presentation stage');
    this.allowedCapabilities = config.allowedCapabilities ? [...config.allowedCapabilities] : [];

    // Initialize parameters
    for (const p of this.adapter.parameters) {
      this.parameterValues[p.id] =
        config.initialParameters && config.initialParameters[p.id] !== undefined
          ? config.initialParameters[p.id]!
          : p.initial;
    }
    if(Object.keys(config.initialParameters??{}).some(k=>!this.adapter.parameters.some(p=>p.id===k))||!this.adapter.validate(this.parameterValues).isValid)throw Error('Invalid initial parameters or noninteractive adapter');
  }

  getAdapter(): ScientificModelAdapter {
    return this.adapter;
  }

  getStage(): CognitiveStage {
    return this.stage;
  }

  setStage(stage: CognitiveStage): void {
    if(!['PREDICT','ATTEMPT','RECONSTRUCT','DIAGNOSE','REPAIR','BOUNDARY_TEST','COMPLETE'].includes(stage))throw Error('Invalid presentation stage');this.stage = stage;
    this.revision++;
  }

  getParameter(id: string): number {
    return this.parameterValues[id] ?? 0;
  }

  setParameter(id: string, value: number): boolean {
    if (typeof value !== 'number' || !Number.isFinite(value) || Number.isNaN(value)) {
      return false;
    }

    const paramDesc = this.adapter.parameters.find((p) => p.id === id);
    if (!paramDesc) return false;

    if(value<paramDesc.min||value>paramDesc.max)return false;
    this.parameterValues[id]=value;
    this.revision++;
    return true;
  }

  /**
   * Keyboard accessible stepping for parameters.
   */
  stepParameter(id: string, direction: 'UP' | 'DOWN' | 'MIN' | 'MAX'): boolean {
    const paramDesc = this.adapter.parameters.find((p) => p.id === id);
    if (!paramDesc) return false;

    const current = this.parameterValues[id] ?? paramDesc.initial;

    if (direction === 'UP') {
      return this.setParameter(id, Math.min(paramDesc.max,Number((current+paramDesc.step).toPrecision(12))));
    } else if (direction === 'DOWN') {
      return this.setParameter(id, Math.max(paramDesc.min,Number((current-paramDesc.step).toPrecision(12))));
    } else if (direction === 'MIN') {
      return this.setParameter(id, paramDesc.min);
    } else if (direction === 'MAX') {
      return this.setParameter(id, paramDesc.max);
    }
    return false;
  }

  evaluate(): PolicyFilteredEvaluationResult {
    const registry = getModelRegistry();
    return registry.evaluateWithPolicy(
      this.adapter.id,
      this.parameterValues,
      this.stage,
      this.allowedCapabilities
    );
  }

  // --- Persistence & State Restoration (Rotate/Touch) ---

  exportState(): ModelInteractionState {
    const evaluation = this.evaluate();
    return {
      modelId: this.adapter.id,
      parameterValues: { ...this.parameterValues },
      isMasked: evaluation.isMasked,
      revision: this.revision,
      lastModifiedAt: new Date().toISOString(),
    };
  }

  restoreState(state: ModelInteractionState): void {
    if(state.modelId!==this.adapter.id||!Number.isSafeInteger(state.revision)||state.revision<1||!this.adapter.validate(state.parameterValues).isValid)throw Error('Invalid model snapshot');this.parameterValues=structuredClone(state.parameterValues);this.revision=state.revision;
  }

  // --- Visual SVG Representation ---

  renderDiagramSvg(width: number = 440, height: number = 240): string {
    if(!Number.isFinite(width)||!Number.isFinite(height)||width<100||height<100)throw Error('Invalid diagram dimensions');
    const evaluation=this.evaluate();
    if(evaluation.isMasked)return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440 240" role="img" aria-label="Model output withheld"><text x="20" y="40">Model output withheld</text></svg>';
    const x = this.parameterValues['x'] ?? 0;

    // Check if this is the energy well model
    if (this.adapter.id==='PHYS-MODEL-ENERGY-WELL') {
      const padding = { top: 30, right: 30, bottom: 40, left: 50 };
      const plotW = width - padding.left - padding.right;
      const plotH = height - padding.top - padding.bottom;

      // Parabola U(x) = 50 * x^2 for x in [-0.5, 0.5] -> U in [0, 12.5]
      const toScreenX = (valX: number): number => padding.left + ((valX + 0.5) / 1.0) * plotW;
      const toScreenY = (valU: number): number => padding.top + plotH - (valU / 14.0) * plotH;

      const curvePoints: string[] = [];
      for (let i = -50; i <= 50; i++) {
        const px = i / 100;
        const pu = 50 * px * px;
        curvePoints.push(`${toScreenX(px).toFixed(1)},${toScreenY(pu).toFixed(1)}`);
      }

      const particleX = toScreenX(x);
      const currentU = 50 * x * x;
      const particleY = toScreenY(currentU);
      const totalEnergyY = toScreenY(12.5);

      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-label="Harmonic Potential Energy Well Diagram">
  <rect width="100%" height="100%" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5" rx="8" />
  <!-- Total Energy Line E = 12.5 J -->
  <line x1="${padding.left}" y1="${totalEnergyY.toFixed(1)}" x2="${padding.left + plotW}" y2="${totalEnergyY.toFixed(1)}" stroke="#10b981" stroke-width="2" stroke-dasharray="6,4" />
  <text x="${padding.left + plotW - 4}" y="${(totalEnergyY - 6).toFixed(1)}" text-anchor="end" font-family="system-ui, sans-serif" font-size="11" fill="#047857">Total E = 12.5 J</text>

  <!-- Potential Curve U(x) -->
  <polyline fill="none" stroke="#2563eb" stroke-width="3" points="${curvePoints.join(' ')}" />

  <!-- Classical Turning Point Bounds -->
  <line x1="${toScreenX(-0.5).toFixed(1)}" y1="${padding.top}" x2="${toScreenX(-0.5).toFixed(1)}" y2="${padding.top + plotH}" stroke="#f87171" stroke-width="1.5" stroke-dasharray="4,4" />
  <line x1="${toScreenX(0.5).toFixed(1)}" y1="${padding.top}" x2="${toScreenX(0.5).toFixed(1)}" y2="${padding.top + plotH}" stroke="#f87171" stroke-width="1.5" stroke-dasharray="4,4" />
  <text x="${toScreenX(-0.5).toFixed(1)}" y="${padding.top + plotH + 20}" text-anchor="middle" font-family="system-ui, sans-serif" font-size="10" fill="#dc2626">-0.5m (TP)</text>
  <text x="${toScreenX(0.5).toFixed(1)}" y="${padding.top + plotH + 20}" text-anchor="middle" font-family="system-ui, sans-serif" font-size="10" fill="#dc2626">+0.5m (TP)</text>

  <!-- Particle Marker -->
  <circle cx="${particleX.toFixed(1)}" cy="${particleY.toFixed(1)}" r="7" fill="#dc2626" stroke="#ffffff" stroke-width="2" />

  <!-- Axes -->
  <line x1="${padding.left}" y1="${padding.top + plotH}" x2="${padding.left + plotW}" y2="${padding.top + plotH}" stroke="#334155" stroke-width="1.5" />
  <text x="${padding.left + plotW / 2}" y="${height - 6}" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" fill="#475569">Position x (m)</text>
</svg>`;
    }

    // Default diagram placeholder for generic models
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-label="${escapeHtml(String(this.adapter.name))} Diagram">
  <rect width="100%" height="100%" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5" rx="8" />
  <text x="${width / 2}" y="${height / 2}" text-anchor="middle" font-family="system-ui, sans-serif" font-size="14" fill="#334155">${escapeHtml(String(this.adapter.name))}</text>
</svg>`;
  }

  generateAccessibleDescription(): string {
    const evaluation = this.evaluate();
    let desc = `${escapeHtml(String(this.adapter.name))}: Active parameters: `;
    const paramDescs = Object.entries(this.parameterValues).map(([k, v]) => `${escapeHtml(String(k))} = ${v}`);
    desc += paramDescs.join(', ') + '.';

    if (evaluation.isMasked) {
      desc += ' Outputs are currently withheld in this learning stage.';
    } else if (evaluation.outputs) {
      desc += ' Calculated outputs: ';
      const outDescs = Object.entries(evaluation.outputs).map(([k, v]) => `${escapeHtml(String(k))} = ${v}`);
      desc += outDescs.join(', ') + '.';
    }
    return desc;
  }

  getViewState(): ModelViewState {
    return {
      modelId: this.adapter.id,
      modelName: this.adapter.name,
      stage: this.stage,
      parameters: { ...this.parameterValues },
      evaluation: this.evaluate(),
      diagramSvg: this.renderDiagramSvg(),
      accessibleDescription: this.generateAccessibleDescription(),
      minHitTargetPx: HIT_TARGET_MIN_PX,
    };
  }

  renderHtml(): string {
    const state = this.getViewState();

    const paramControls = this.adapter.parameters
      .map((p) => {
        const val = state.parameters[p.id] ?? p.initial;
        return `
        <div class="model-param-control" style="margin-bottom: 16px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <label for="param-input-${escapeHtml(String(p.id))}" style="font-weight: 600; color: #1e293b;">
              ${escapeHtml(String(p.name))} (${escapeHtml(String(p.symbol))}): <strong>${val} ${escapeHtml(String(p.unit))}</strong>
            </label>
            <span style="font-size: 12px; color: #64748b;">[${p.min} to ${p.max}]</span>
          </div>
          <div style="display: flex; gap: 8px; align-items: center;">
            <button class="param-step-btn" data-param="${escapeHtml(String(p.id))}" data-dir="DOWN" style="min-height: ${HIT_TARGET_MIN_PX}px; min-width: ${HIT_TARGET_MIN_PX}px; padding: 8px 12px; background: #e2e8f0; border-radius: 6px; font-weight: 600;">−</button>
            <input
              id="param-input-${escapeHtml(String(p.id))}"
              type="range"
              min="${p.min}"
              max="${p.max}"
              step="${p.step}"
              value="${val}"
              data-param="${escapeHtml(String(p.id))}"
              style="flex: 1; min-height: ${HIT_TARGET_MIN_PX}px; cursor: pointer;"
              aria-label="${escapeHtml(String(p.name))}"
            />
            <button class="param-step-btn" data-param="${escapeHtml(String(p.id))}" data-dir="UP" style="min-height: ${HIT_TARGET_MIN_PX}px; min-width: ${HIT_TARGET_MIN_PX}px; padding: 8px 12px; background: #e2e8f0; border-radius: 6px; font-weight: 600;">+</button>
          </div>
        </div>
      `;
      })
      .join('');

    let outputsHtml = '';
    if (state.evaluation.isMasked) {
      outputsHtml = `
        <div class="model-outputs-masked" style="padding: 12px 16px; background: #fef3c7; border: 1px solid #fde047; border-radius: 6px; font-size: 13px; color: #854d0e;">
          🔒 <strong>Pre-Commit Masking:</strong> Automatic model calculation outputs are withheld in stage <em>${escapeHtml(String(state.stage))}</em> to support learner derivation.
        </div>
      `;
    } else if (state.evaluation.outputs) {
      const outputRows = Object.entries(state.evaluation.outputs)
        .map(
          ([k, v]) => `
          <div style="display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid #f1f5f9;">
            <span style="color: #475569;">${escapeHtml(String(k))}:</span>
            <strong style="color: #0f172a;">${typeof v === 'number' ? v.toFixed(3) : JSON.stringify(v)}</strong>
          </div>`
        )
        .join('');

      outputsHtml = `
        <div class="model-outputs-revealed" style="padding: 12px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px;">
          <h4 style="margin: 0 0 8px 0; font-size: 14px; color: #1e293b;">Calculated Model Outputs</h4>
          ${outputRows}
        </div>
      `;
    }

    return `
      <section class="scientific-model-panel" aria-label="${escapeHtml(String(this.adapter.name))}" style="padding: 16px; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px;">
        <h3 style="margin-top: 0; font-size: 18px; color: #0f172a;">${escapeHtml(String(this.adapter.name))}</h3>
        <p style="font-size: 13px; color: #64748b; margin-bottom: 16px;">${escapeHtml(String(this.adapter.description))}</p>
        <div class="model-diagram" style="margin-bottom: 16px;">
          ${state.diagramSvg}
        </div>
        <div class="sr-only" aria-live="polite">${escapeHtml(String(state.accessibleDescription))}</div>
        <div class="model-controls">
          ${paramControls}
        </div>
        ${outputsHtml}
      </section>
    `;
  }
}
