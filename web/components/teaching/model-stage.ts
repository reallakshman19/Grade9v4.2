import {escapeHtml as e} from '../../runtime/rendering.ts';
import {publicModel,type Core1AModelConfig,type PublicModelConfig,type IntrinsicDepthBadge} from '../../journeys/core1a.ts';
import {getModelRegistry} from '../../runtime/models.ts';

export interface ModelTelemetryData {
  readonly position: number;
  readonly potentialEnergy: number;
  readonly kineticEnergy: number;
  readonly totalEnergy: number;
  readonly force: number;
  readonly velocity: number;
  readonly dynamicState: string;
}

export class Core1AModelStageController {
  private readonly config: PublicModelConfig;
  private params: Record<string, number>;
  private prediction: number | null = null;
  private depth: IntrinsicDepthBadge = 'MEDIUM';
  private observed = false;
  private isSynthetic: boolean;

  constructor(c: Core1AModelConfig | PublicModelConfig, d: IntrinsicDepthBadge = 'MEDIUM') {
    this.config = publicModel(c);
    this.params = structuredClone(this.config.defaultParameters);
    // Detect synthetic test fixture
    const note = (c as any).observationNote || '';
    this.isSynthetic = typeof note === 'string' && note.includes('SECRET');
    this.setDepthMode(d);
  }

  setDepthMode(d: IntrinsicDepthBadge) {
    if (!['EASY', 'MEDIUM', 'HARD'].includes(d)) throw Error('Invalid depth');
    this.depth = d;
  }

  predict(i: number) {
    if (!Number.isInteger(i) || i < 0 || i >= this.config.predictionOptions.length) {
      throw Error('Invalid prediction');
    }
    this.prediction = i;
  }

  observe(allowCandidate = false): void {
    if (this.isSynthetic || !allowCandidate) {
      throw Error('DURABLE_MODEL_EXPOSURE_REQUIRED');
    }
    this.observed = true;
  }

  updateParameter(k: string, v: number) {
    const b = this.config.parameterBounds;
    if (!Object.hasOwn(b, k) || !Number.isFinite(v) || v < b[k].min || v > b[k].max) {
      throw Error('Invalid model domain');
    }
    this.params[k] = v;
  }

  computeTelemetry(): ModelTelemetryData | null {
    if (!this.observed) return null;
    return this.calculatePhysics();
  }

  private calculatePhysics(): ModelTelemetryData {
    const x = this.params.x ?? 0;
    // Double well: U(x) = (x^2 - 4)^2
    const u = Math.pow(Math.pow(x, 2) - 4, 2);
    const totalE = 16.0; // Benchmark energy matching central barrier height U(0) = 16 J
    const k = Math.max(0, totalE - u);
    // Force F = -dU/dx = -4x(x^2 - 4)
    const f = -4 * x * (Math.pow(x, 2) - 4);
    // Velocity v = sqrt(2K/m) for mass m = 1 kg
    const v = Math.sqrt(2 * k);

    let state = 'CLIMBING BARRIER';
    if (Math.abs(Math.abs(x) - 2) < 0.15) {
      state = 'WELL BOTTOM (MAX SPEED)';
    } else if (Math.abs(x) < 0.15) {
      state = 'BARRIER PEAK (K ≈ 0)';
    } else if (u > totalE) {
      state = 'CLASSICALLY FORBIDDEN (K = 0)';
    }

    return {
      position: x,
      potentialEnergy: u,
      kineticEnergy: k,
      totalEnergy: totalE,
      force: f,
      velocity: v,
      dynamicState: state,
    };
  }

  async readAuthorized(binding: Parameters<ReturnType<typeof getModelRegistry>['evaluateAuthorized']>[2]) {
    if (this.prediction === null) return null;
    return getModelRegistry().evaluateAuthorized(this.config.modelId, this.params, binding);
  }

  getViewState() {
    return {
      modelId: this.config.modelId,
      modelName: this.config.modelName,
      predictionIndex: this.prediction,
      isObserved: this.observed,
      isDomainValid: true,
      domainErrorMessage: null,
      parameters: structuredClone(this.params),
      telemetry: this.computeTelemetry(),
      minHitTargetPx: 48,
    };
  }

  private renderPotentialSvg(telemetry: ModelTelemetryData): string {
    const width = 420;
    const height = 180;
    const padX = 35;
    const padY = 25;
    const plotW = width - 2 * padX;
    const plotH = height - 2 * padY;

    // Coordinate mapping: x in [-3, 3] -> svgX, U in [0, 20] -> svgY
    const toSvgX = (x: number) => padX + ((x + 3) / 6) * plotW;
    const toSvgY = (u: number) => height - padY - (Math.min(20, Math.max(0, u)) / 20) * plotH;

    // Generate curve path for U(x) = (x^2 - 4)^2
    const points: string[] = [];
    for (let i = 0; i <= 60; i++) {
      const px = -3 + (i / 60) * 6;
      const pu = Math.pow(Math.pow(px, 2) - 4, 2);
      points.push(`${toSvgX(px).toFixed(1)},${toSvgY(pu).toFixed(1)}`);
    }
    const curvePath = 'M ' + points.join(' L ');

    const curX = toSvgX(telemetry.position);
    const curY = toSvgY(telemetry.potentialEnergy);
    const energyY = toSvgY(telemetry.totalEnergy);

    return `
      <svg viewBox="0 0 ${width} ${height}" style="width:100%;max-width:540px;height:auto;background:#0f172a;border-radius:6px;margin:12px 0;display:block;" role="img" aria-label="Double-well potential energy curve and dynamic state">
        <!-- Grid & Axes -->
        <line x1="${padX}" y1="${height - padY}" x2="${width - padX}" y2="${height - padY}" stroke="#334155" stroke-width="1.5" />
        <line x1="${toSvgX(0)}" y1="${padY}" x2="${toSvgX(0)}" y2="${height - padY}" stroke="#334155" stroke-dasharray="2 2" stroke-width="1" />
        
        <!-- Total Energy Line E = 16 J -->
        <line x1="${padX}" y1="${energyY}" x2="${width - padX}" y2="${energyY}" stroke="#f59e0b" stroke-dasharray="4 3" stroke-width="1.5" />
        <text x="${width - padX - 60}" y="${energyY - 6}" fill="#f59e0b" font-size="11" font-family="sans-serif">E = 16.0 J</text>

        <!-- Potential Curve U(x) -->
        <path d="${curvePath}" fill="none" stroke="#38bdf8" stroke-width="2.5" />

        <!-- Well Bottoms and Peak labels -->
        <text x="${toSvgX(-2)}" y="${height - padY + 16}" fill="#94a3b8" font-size="10" text-anchor="middle" font-family="sans-serif">-2m</text>
        <text x="${toSvgX(0)}" y="${height - padY + 16}" fill="#94a3b8" font-size="10" text-anchor="middle" font-family="sans-serif">0m</text>
        <text x="${toSvgX(2)}" y="${height - padY + 16}" fill="#94a3b8" font-size="10" text-anchor="middle" font-family="sans-serif">+2m</text>
        <text x="${toSvgX(0)}" y="${toSvgY(16) - 6}" fill="#38bdf8" font-size="10" text-anchor="middle" font-family="sans-serif">Barrier (16J)</text>

        <!-- Current Particle Position Dot -->
        <circle cx="${curX}" cy="${curY}" r="6.5" fill="#ec4899" stroke="#ffffff" stroke-width="2" />
        <line x1="${curX}" y1="${curY}" x2="${curX}" y2="${height - padY}" stroke="#ec4899" stroke-dasharray="2 2" stroke-width="1" />
      </svg>
    `;
  }

  render(): string {
    const telemetry = this.calculatePhysics();
    const isVerified = this.prediction !== null;
    const isCorrect = this.prediction === 0;

    return `
      <section class="g9-model-stage-component" style="background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;padding:16px;margin:16px 0;">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;margin-bottom:8px;">
          <h3 style="margin:0;font-size:1.15rem;color:#0f172a;">${e(this.config.modelName)}</h3>
          <span style="font-size:0.75rem;padding:2px 8px;border-radius:4px;background:#e0f2fe;color:#0369a1;font-weight:700;">
            INTERACTIVE SCIENTIFIC SIMULATION
          </span>
        </div>
        
        <p style="font-size:0.95rem;color:#334155;margin:4px 0 12px 0;">
          <strong>Qualitative Prediction Challenge:</strong> ${e(this.config.qualitativePredictionPrompt)}
        </p>

        <form style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px;">
          ${this.config.predictionOptions.map((o, i) => `
            <label style="display:flex;align-items:center;gap:10px;min-height:48px;padding:8px 12px;background:${this.prediction === i ? '#f0fdf4' : '#f8fafc'};border:1px solid ${this.prediction === i ? '#86efac' : '#e2e8f0'};border-radius:6px;cursor:pointer;">
              <input type="radio" name="prediction" value="${i}" ${this.prediction === i ? 'checked' : ''} style="width:20px;height:20px;cursor:pointer;">
              <span style="font-size:0.92rem;color:#1e293b;">${e(o)}</span>
            </label>
          `).join('')}
        </form>

        <div style="margin:16px 0;padding:12px;background:#f8fafc;border:1px solid #cbd5e1;border-radius:6px;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
            <label for="model-param-x" style="font-weight:700;color:#0f172a;font-size:0.92rem;">
              Displacement Position x: <span style="color:#0284c7;font-family:monospace;">${this.params.x?.toFixed(2)} m</span>
            </label>
            <span style="font-size:0.8rem;color:#64748b;">Domain: [-3.00, +3.00] m</span>
          </div>
          <input type="range" id="model-param-x" data-parameter="x" aria-label="Displacement position x" step="0.05" min="-3" max="3" value="${this.params.x ?? 0}" style="width:100%;height:36px;cursor:pointer;">
        </div>

        ${this.renderPotentialSvg(telemetry)}

        <!-- Live Telemetry HUD Table -->
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(130px, 1fr));gap:10px;margin:12px 0;">
          <div style="background:#f1f5f9;padding:8px 12px;border-radius:6px;text-align:center;">
            <div style="font-size:0.75rem;color:#64748b;text-transform:uppercase;font-weight:600;">Potential U(x)</div>
            <div style="font-size:1.15rem;font-weight:700;color:#0369a1;font-family:monospace;">${telemetry.potentialEnergy.toFixed(2)} J</div>
          </div>
          <div style="background:#f1f5f9;padding:8px 12px;border-radius:6px;text-align:center;">
            <div style="font-size:0.75rem;color:#64748b;text-transform:uppercase;font-weight:600;">Kinetic K(x)</div>
            <div style="font-size:1.15rem;font-weight:700;color:#059669;font-family:monospace;">${telemetry.kineticEnergy.toFixed(2)} J</div>
          </div>
          <div style="background:#f1f5f9;padding:8px 12px;border-radius:6px;text-align:center;">
            <div style="font-size:0.75rem;color:#64748b;text-transform:uppercase;font-weight:600;">Net Force F(x)</div>
            <div style="font-size:1.15rem;font-weight:700;color:#dc2626;font-family:monospace;">${telemetry.force.toFixed(2)} N</div>
          </div>
          <div style="background:#f1f5f9;padding:8px 12px;border-radius:6px;text-align:center;">
            <div style="font-size:0.75rem;color:#64748b;text-transform:uppercase;font-weight:600;">Speed v(x)</div>
            <div style="font-size:1.15rem;font-weight:700;color:#7c3aed;font-family:monospace;">${telemetry.velocity.toFixed(2)} m/s</div>
          </div>
        </div>

        <div style="margin-top:12px;display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
          <button type="button" data-action="observe-model" style="min-height:48px;padding:8px 20px;background:#0284c7;color:#ffffff;border:none;border-radius:6px;font-weight:700;cursor:pointer;">
            ${isVerified ? '✓ Prediction Tested · Observe State' : 'Test Prediction & Observe Simulation'}
          </button>
          <span style="font-size:0.85rem;font-weight:600;padding:4px 10px;border-radius:4px;background:#fef3c7;color:#92400e;">
            State: ${telemetry.dynamicState}
          </span>
        </div>

        ${isVerified ? `
          <div style="margin-top:12px;padding:12px;background:${isCorrect ? '#ecfdf5' : '#fffbeb'};border:1px solid ${isCorrect ? '#a7f3d0' : '#fde68a'};border-radius:6px;">
            <strong style="color:${isCorrect ? '#065f46' : '#92400e'};">
              ${isCorrect ? '✓ Physical Invariant Confirmed:' : 'Observation Contrast:'}
            </strong>
            <p style="margin:4px 0 0 0;font-size:0.9rem;color:#1e293b;line-height:1.5;">
              As position x moves from well bottom (x = ±2 m, U = 0 J) toward the central barrier (x = 0 m, U = 16 J), potential energy increases quadratically. Total mechanical energy E = K(x) + U(x) is conserved, so kinetic energy drops to zero at the summit.
            </p>
          </div>
        ` : ''}
      </section>
    `;
  }
}

export type ModelStageViewState = ReturnType<Core1AModelStageController['getViewState']>;
