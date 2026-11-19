/**
 * web/pages/settings.ts
 * Workpack A36: Settings, Diagnostics, and Data Management Page Controller.
 *
 * Implements:
 * - Accessible typography scaling controls: bounds [0.85, 1.50], step 0.05, reset to 1.0.
 * - Live child-friendly typography preview card.
 * - Storage diagnostics and health monitor (IndexedDB, in-memory fallback, blocked alerts).
 * - Full backup export and verified import with SHA-256 integrity check and conflict resolution.
 * - Full tablet ergonomics (min 48px touch targets, dual orientation layout, 0px horizontal overflow).
 * - Academic status disclaimer: academic_admission: HOLD, production_release: NONE.
 *
 * No academic approval inferred from software validation.
 * academic_admission: HOLD
 * release_authority: NONE
 */

import { escapeHtml as e } from '../runtime/rendering.ts';
import {
  HIT_TARGET_MIN_PX,
  HIT_TARGET_PRIMARY_PX,
  FONT_SCALE_MIN,
  FONT_SCALE_MAX,
  FONT_SCALE_DEFAULT,
  FONT_SCALE_STEP,
} from '../styles/tokens.ts';
import type { ProgressStore } from '../runtime/contracts.ts';
import { STORAGE_EXPORT_VERSION, computeSha256 } from '../runtime/progress.ts';

export type StorageHealthStatus =
  | 'AVAILABLE'
  | 'MEMORY_FALLBACK'
  | 'BLOCKED'
  | 'QUOTA_EXCEEDED'
  | 'ERROR';

export interface StorageDiagnostics {
  readonly status: StorageHealthStatus;
  readonly driverType: 'IndexedDB' | 'MemoryStorage' | 'Blocked' | 'Unknown';
  readonly attemptCount: number;
  readonly sessionCount: number;
  readonly lastExportAt?: string;
  readonly errorDetails?: string;
}

export interface SettingsState {
  fontScale: number;
  diagnostics: StorageDiagnostics;
}

const COLOR_PRIMARY = '#1a73e8';
const COLOR_SURFACE = '#ffffff';
const COLOR_TEXT = '#202124';
const COLOR_TEXT_MUTED = '#5f6368';
const COLOR_BORDER = '#dadce0';
const COLOR_ERROR = '#d93025';
const COLOR_WARNING = '#b06000';
const COLOR_SUCCESS = '#137333';
const ELEVATION_CARD = '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)';

export class SettingsPageController {
  private rootElement: HTMLElement | null = null;
  private progressStore: ProgressStore | null = null;
  private fontScale: number = FONT_SCALE_DEFAULT;
  private diagnostics: StorageDiagnostics = {
    status: 'AVAILABLE',
    driverType: 'IndexedDB',
    attemptCount: 0,
    sessionCount: 0,
  };
  private messageBanner: { type: 'SUCCESS' | 'ERROR' | 'INFO'; text: string } | null = null;
  private onFontScaleChange?: (scale: number) => void;
  private onBackupExported?: (blob: Blob) => void;
  private onBackupImported?: () => void;

  constructor(
    progressStore?: ProgressStore,
    initialFontScale = FONT_SCALE_DEFAULT,
    callbacks?: {
      onFontScaleChange?: (scale: number) => void;
      onBackupExported?: (blob: Blob) => void;
      onBackupImported?: () => void;
    }
  ) {
    this.progressStore = progressStore || null;
    this.fontScale = this.clampFontScale(initialFontScale);
    this.onFontScaleChange = callbacks?.onFontScaleChange;
    this.onBackupExported = callbacks?.onBackupExported;
    this.onBackupImported = callbacks?.onBackupImported;
  }

  public getFontScale(): number {
    return this.fontScale;
  }

  public setFontScale(scale: number): void {
    this.fontScale = this.clampFontScale(scale);
    this.applyFontScaleToDocument();
    if (this.onFontScaleChange) {
      this.onFontScaleChange(this.fontScale);
    }
    this.render();
  }

  public increaseFontScale(): void {
    const next = Math.min(FONT_SCALE_MAX, Math.round((this.fontScale + FONT_SCALE_STEP) * 100) / 100);
    this.setFontScale(next);
  }

  public decreaseFontScale(): void {
    const prev = Math.max(FONT_SCALE_MIN, Math.round((this.fontScale - FONT_SCALE_STEP) * 100) / 100);
    this.setFontScale(prev);
  }

  public resetFontScale(): void {
    this.setFontScale(FONT_SCALE_DEFAULT);
  }

  private clampFontScale(scale: number): number {
    if (Number.isNaN(scale) || !Number.isFinite(scale)) {
      return FONT_SCALE_DEFAULT;
    }
    const clamped = Math.min(FONT_SCALE_MAX, Math.max(FONT_SCALE_MIN, scale));
    return Math.round(clamped * 100) / 100;
  }

  private applyFontScaleToDocument(): void {
    if (typeof document !== 'undefined' && document.documentElement) {
      document.documentElement.style.setProperty('--g9-font-scale', `${this.fontScale}`);
    }
  }

  public setDiagnostics(diag: Partial<StorageDiagnostics>): void {
    this.diagnostics = {
      ...this.diagnostics,
      ...diag,
    };
    this.render();
  }

  public getDiagnostics(): StorageDiagnostics {
    return this.diagnostics;
  }

  public setStorageBlocked(blocked: boolean, details?: string): void {
    this.diagnostics = {
      ...this.diagnostics,
      status: blocked ? 'BLOCKED' : 'AVAILABLE',
      driverType: blocked ? 'Blocked' : this.diagnostics.driverType,
      errorDetails: details,
    };
    this.render();
  }

  public mount(container: HTMLElement): void {
    this.rootElement = container;
    this.applyFontScaleToDocument();
    this.render();
  }

  /**
   * Triggers export of all learner attempts, sessions, and drafts via the ProgressStore.
   */
  public async exportBackup(): Promise<Blob | null> {
    if (!this.progressStore) {
      this.messageBanner = {
        type: 'ERROR',
        text: 'Cannot export backup: Progress store is not connected.',
      };
      this.render();
      return null;
    }

    try {
      const blob = await this.progressStore.exportAll();
      const text = await blob.text();
      const parsed = JSON.parse(text);
      const attemptCount = parsed?.data?.attempts?.length ?? 0;
      const sha = parsed?.checksum ?? (await computeSha256(text));

      this.diagnostics = {
        ...this.diagnostics,
        attemptCount,
        lastExportAt: new Date().toISOString(),
      };

      this.messageBanner = {
        type: 'SUCCESS',
        text: `Backup exported successfully (${attemptCount} attempts, SHA-256: ${sha.slice(0, 12)}...).`,
      };

      if (this.onBackupExported) {
        this.onBackupExported(blob);
      }

      this.render();
      return blob;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      this.messageBanner = {
        type: 'ERROR',
        text: `Export failed: ${msg}`,
      };
      this.render();
      return null;
    }
  }

  /**
   * Imports a verified backup JSON file via the ProgressStore.
   */
  public async importBackup(fileBlob: Blob): Promise<boolean> {
    if (!this.progressStore) {
      this.messageBanner = {
        type: 'ERROR',
        text: 'Cannot import backup: Progress store is not connected.',
      };
      this.render();
      return false;
    }

    try {
      await this.progressStore.importVerified(fileBlob);
      this.messageBanner = {
        type: 'SUCCESS',
        text: 'Backup imported and verified successfully. All attempt evidence preserved.',
      };

      if (this.onBackupImported) {
        this.onBackupImported();
      }

      this.render();
      return true;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      this.messageBanner = {
        type: 'ERROR',
        text: `Import failed: ${msg}`,
      };
      this.render();
      return false;
    }
  }

  public render(): void {
    if (!this.rootElement) return;

    const minHit = `${HIT_TARGET_MIN_PX}px`;
    const primaryHit = `${HIT_TARGET_PRIMARY_PX}px`;
    const percentStr = `${Math.round(this.fontScale * 100)}%`;

    const isMinScale = this.fontScale <= FONT_SCALE_MIN;
    const isMaxScale = this.fontScale >= FONT_SCALE_MAX;
    const isDefaultScale = Math.abs(this.fontScale - FONT_SCALE_DEFAULT) < 0.001;

    let statusBadgeColor = COLOR_SUCCESS;
    let statusBadgeBg = '#e6f4ea';
    let statusLabel = 'Active & Available';

    if (this.diagnostics.status === 'MEMORY_FALLBACK') {
      statusBadgeColor = COLOR_WARNING;
      statusBadgeBg = '#fef7e0';
      statusLabel = 'In-Memory Fallback (Session Only)';
    } else if (this.diagnostics.status === 'BLOCKED') {
      statusBadgeColor = COLOR_ERROR;
      statusBadgeBg = '#fce8e6';
      statusLabel = 'Blocked / Restricted';
    } else if (this.diagnostics.status === 'QUOTA_EXCEEDED') {
      statusBadgeColor = COLOR_ERROR;
      statusBadgeBg = '#fce8e6';
      statusLabel = 'Storage Quota Exceeded';
    }

    this.rootElement.innerHTML = `
      <div class="settings-page-container" style="
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
        padding: 16px;
        box-sizing: border-box;
      ">
        <!-- Header -->
        <header style="margin-bottom: 24px;">
          <h2 style="margin: 0 0 8px 0; font-size: 24px; color: ${COLOR_TEXT};">Settings & Storage Diagnostics</h2>
          <p style="margin: 0; color: ${COLOR_TEXT_MUTED}; font-size: 14px;">
            Configure accessible typography scaling, inspect storage health, and export or restore verified attempt backups.
          </p>
        </header>

        <!-- Rule 13 / Academic Disclaimer Banner -->
        <div class="governance-disclaimer" role="note" style="
          background-color: #f1f3f4;
          border-left: 4px solid #5f6368;
          padding: 12px 16px;
          border-radius: 4px;
          font-size: 13px;
          color: #3c4043;
          margin-bottom: 24px;
          line-height: 1.5;
        ">
          <strong>Academic & Release Status:</strong> Academic admission is on <code>HOLD</code>; production release authority is <code>NONE</code>.
          Zero cognitive mastery or exam readiness is claimed. No academic approval is inferred from software verification.
        </div>

        ${
          this.diagnostics.status === 'BLOCKED'
            ? `
          <!-- Blocked Storage Warning Alert -->
          <div class="storage-blocked-alert" role="alert" style="
            background-color: #fce8e6;
            border: 1px solid #fad2cf;
            border-left: 4px solid ${COLOR_ERROR};
            border-radius: 4px;
            padding: 14px 16px;
            margin-bottom: 24px;
            font-size: 14px;
            color: #c5221f;
            line-height: 1.5;
          ">
            <strong>⚠️ Storage Blocked Warning:</strong> Browser storage access (IndexedDB) is blocked or denied.
            New attempts and responses will be saved in ephemeral memory for the duration of this tab only.
            Please enable browser storage permissions or export a backup before navigating away to prevent data loss.
            ${this.diagnostics.errorDetails ? `<div style="font-family: monospace; font-size: 12px; margin-top: 4px;">Error: ${e(this.diagnostics.errorDetails)}</div>` : ''}
          </div>
        `
            : ''
        }

        ${
          this.messageBanner
            ? `
          <div class="message-banner" role="status" style="
            background-color: ${this.messageBanner.type === 'SUCCESS' ? '#e6f4ea' : this.messageBanner.type === 'ERROR' ? '#fce8e6' : '#e8f0fe'};
            border: 1px solid ${this.messageBanner.type === 'SUCCESS' ? '#ceead6' : this.messageBanner.type === 'ERROR' ? '#fad2cf' : '#c2e7ff'};
            border-radius: 8px;
            padding: 12px 16px;
            margin-bottom: 20px;
            font-size: 14px;
            color: ${this.messageBanner.type === 'SUCCESS' ? COLOR_SUCCESS : this.messageBanner.type === 'ERROR' ? COLOR_ERROR : COLOR_PRIMARY};
          ">
            ${e(this.messageBanner.text)}
          </div>
        `
            : ''
        }

        <div style="display: flex; flex-direction: column; gap: 24px;">
          <!-- Section 1: Typography & Accessibility Scaling -->
          <section class="settings-card font-scale-section" style="
            background: ${COLOR_SURFACE};
            border: 1px solid ${COLOR_BORDER};
            border-radius: 12px;
            padding: 20px;
            box-shadow: ${ELEVATION_CARD};
          ">
            <h3 style="margin: 0 0 8px 0; font-size: 18px; color: ${COLOR_TEXT};">Accessible Font Scaling</h3>
            <p style="margin: 0 0 16px 0; color: ${COLOR_TEXT_MUTED}; font-size: 14px;">
              Adjust text sizing across all learning modules and challenges. Bounds: 85% to 150%.
            </p>

            <div style="display: flex; align-items: center; gap: 16px; flex-wrap: wrap; margin-bottom: 20px;">
              <button type="button" class="font-scale-btn font-scale-decrease" ${isMinScale ? 'disabled' : ''} aria-label="Decrease font size" style="
                min-width: ${primaryHit};
                min-height: ${primaryHit};
                border: 1px solid ${COLOR_BORDER};
                border-radius: 8px;
                background: ${isMinScale ? '#f1f3f4' : COLOR_SURFACE};
                color: ${isMinScale ? '#9aa0a6' : COLOR_TEXT};
                font-size: 20px;
                font-weight: 700;
                cursor: ${isMinScale ? 'not-allowed' : 'pointer'};
                display: inline-flex;
                align-items: center;
                justify-content: center;
              ">A−</button>

              <div class="font-scale-display" style="
                font-size: 18px;
                font-weight: 700;
                color: ${COLOR_PRIMARY};
                min-width: 80px;
                text-align: center;
              ">${percentStr}</div>

              <button type="button" class="font-scale-btn font-scale-increase" ${isMaxScale ? 'disabled' : ''} aria-label="Increase font size" style="
                min-width: ${primaryHit};
                min-height: ${primaryHit};
                border: 1px solid ${COLOR_BORDER};
                border-radius: 8px;
                background: ${isMaxScale ? '#f1f3f4' : COLOR_SURFACE};
                color: ${isMaxScale ? '#9aa0a6' : COLOR_TEXT};
                font-size: 20px;
                font-weight: 700;
                cursor: ${isMaxScale ? 'not-allowed' : 'pointer'};
                display: inline-flex;
                align-items: center;
                justify-content: center;
              ">A+</button>

              <button type="button" class="font-scale-btn font-scale-reset" ${isDefaultScale ? 'disabled' : ''} style="
                min-height: ${minHit};
                padding: 0 16px;
                border: 1px solid ${COLOR_BORDER};
                border-radius: 8px;
                background: ${isDefaultScale ? '#f1f3f4' : COLOR_SURFACE};
                color: ${isDefaultScale ? '#9aa0a6' : COLOR_TEXT_MUTED};
                font-size: 14px;
                font-weight: 500;
                cursor: ${isDefaultScale ? 'not-allowed' : 'pointer'};
              ">Reset to 100%</button>
            </div>

            <!-- Live Typography Scaling Preview Card -->
            <div class="typography-preview-card" style="
              background: #f8f9fa;
              border: 1px dashed ${COLOR_BORDER};
              border-radius: 8px;
              padding: 16px;
              margin-top: 12px;
            ">
              <span style="display: block; font-size: 11px; text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px; color: ${COLOR_TEXT_MUTED}; margin-bottom: 8px;">
                Live Typography Preview (${percentStr})
              </span>
              <div class="preview-content" style="
                font-size: calc(16px * ${this.fontScale});
                line-height: 1.5;
                color: ${COLOR_TEXT};
              ">
                <p style="margin: 0 0 8px 0; font-weight: 600;">
                  Newton's Second Law: Force and Acceleration
                </p>
                <p style="margin: 0 0 8px 0; color: #3c4043;">
                  The rate of change of momentum of a body is directly proportional to the applied force and takes place in the direction in which the force acts:
                </p>
                <div style="font-family: 'Courier New', monospace; font-size: calc(18px * ${this.fontScale}); color: ${COLOR_PRIMARY}; background: #ffffff; padding: 8px 12px; border-radius: 6px; border: 1px solid #e8eaed; display: inline-block;">
                  F = m · a &nbsp;|&nbsp; [N] = [kg] · [m/s²]
                </div>
              </div>
            </div>
          </section>

          <!-- Section 2: Storage Diagnostics & Health -->
          <section class="settings-card storage-diagnostics-section" style="
            background: ${COLOR_SURFACE};
            border: 1px solid ${COLOR_BORDER};
            border-radius: 12px;
            padding: 20px;
            box-shadow: ${ELEVATION_CARD};
          ">
            <h3 style="margin: 0 0 8px 0; font-size: 18px; color: ${COLOR_TEXT};">Storage Diagnostics</h3>
            <p style="margin: 0 0 16px 0; color: ${COLOR_TEXT_MUTED}; font-size: 14px;">
              Local device persistence status, storage engine type, and attempt integrity ledger.
            </p>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px; margin-bottom: 16px;">
              <div style="background: #f8f9fa; border: 1px solid #e8eaed; border-radius: 8px; padding: 12px;">
                <div style="font-size: 12px; color: ${COLOR_TEXT_MUTED};">Storage Health</div>
                <div style="margin-top: 6px;">
                  <span class="storage-status-badge" style="
                    background: ${statusBadgeBg};
                    color: ${statusBadgeColor};
                    font-size: 12px;
                    font-weight: 600;
                    padding: 4px 10px;
                    border-radius: 12px;
                    display: inline-block;
                  ">${e(statusLabel)}</span>
                </div>
              </div>

              <div style="background: #f8f9fa; border: 1px solid #e8eaed; border-radius: 8px; padding: 12px;">
                <div style="font-size: 12px; color: ${COLOR_TEXT_MUTED};">Storage Driver</div>
                <div style="font-size: 15px; font-weight: 600; color: ${COLOR_TEXT}; margin-top: 6px;">
                  ${e(this.diagnostics.driverType)}
                </div>
              </div>

              <div style="background: #f8f9fa; border: 1px solid #e8eaed; border-radius: 8px; padding: 12px;">
                <div style="font-size: 12px; color: ${COLOR_TEXT_MUTED};">Recorded Attempts</div>
                <div style="font-size: 15px; font-weight: 600; color: ${COLOR_TEXT}; margin-top: 6px;">
                  ${this.diagnostics.attemptCount}
                </div>
              </div>

              <div style="background: #f8f9fa; border: 1px solid #e8eaed; border-radius: 8px; padding: 12px;">
                <div style="font-size: 12px; color: ${COLOR_TEXT_MUTED};">Active Sessions</div>
                <div style="font-size: 15px; font-weight: 600; color: ${COLOR_TEXT}; margin-top: 6px;">
                  ${this.diagnostics.sessionCount}
                </div>
              </div>
            </div>
          </section>

          <!-- Section 3: Data Management & Backup -->
          <section class="settings-card data-management-section" style="
            background: ${COLOR_SURFACE};
            border: 1px solid ${COLOR_BORDER};
            border-radius: 12px;
            padding: 20px;
            box-shadow: ${ELEVATION_CARD};
          ">
            <h3 style="margin: 0 0 8px 0; font-size: 18px; color: ${COLOR_TEXT};">Backup & Restore</h3>
            <p style="margin: 0 0 16px 0; color: ${COLOR_TEXT_MUTED}; font-size: 14px;">
              Export a cryptographically checked JSON backup of all offline attempt evidence, or restore from an earlier backup bundle.
            </p>

            <div style="display: flex; gap: 12px; flex-wrap: wrap;">
              <button type="button" class="export-backup-btn" style="
                min-height: ${minHit};
                padding: 0 20px;
                background-color: ${COLOR_PRIMARY};
                color: #ffffff;
                border: none;
                border-radius: 8px;
                font-size: 14px;
                font-weight: 600;
                cursor: pointer;
                display: inline-flex;
                align-items: center;
                gap: 8px;
              ">⬇ Export Backup</button>

              <label class="import-backup-label" style="
                min-height: ${minHit};
                padding: 0 20px;
                background-color: ${COLOR_SURFACE};
                color: ${COLOR_TEXT};
                border: 1px solid ${COLOR_BORDER};
                border-radius: 8px;
                font-size: 14px;
                font-weight: 600;
                cursor: pointer;
                display: inline-flex;
                align-items: center;
                gap: 8px;
                box-sizing: border-box;
              ">
                ⬆ Import Backup
                <input type="file" class="import-backup-input" accept=".json,application/json" style="display: none;" />
              </label>
            </div>
          </section>
        </div>
      </div>
    `;

    this.attachEventListeners();
  }

  private attachEventListeners(): void {
    if (!this.rootElement || typeof this.rootElement.querySelector !== 'function') return;

    // Font scaling buttons
    const incBtn = this.rootElement.querySelector<HTMLButtonElement>('.font-scale-increase');
    if (incBtn) {
      incBtn.addEventListener('click', () => this.increaseFontScale());
    }

    const decBtn = this.rootElement.querySelector<HTMLButtonElement>('.font-scale-decrease');
    if (decBtn) {
      decBtn.addEventListener('click', () => this.decreaseFontScale());
    }

    const resetBtn = this.rootElement.querySelector<HTMLButtonElement>('.font-scale-reset');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => this.resetFontScale());
    }

    // Export button
    const exportBtn = this.rootElement.querySelector<HTMLButtonElement>('.export-backup-btn');
    if (exportBtn) {
      exportBtn.addEventListener('click', async () => {
        await this.exportBackup();
      });
    }

    // Import file input
    const importInput = this.rootElement.querySelector<HTMLInputElement>('.import-backup-input');
    if (importInput) {
      importInput.addEventListener('change', async () => {
        const file = importInput.files?.[0];
        if (file) {
          await this.importBackup(file);
        }
      });
    }
  }
}
