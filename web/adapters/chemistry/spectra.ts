/**
 * web/adapters/chemistry/spectra.ts
 * A28 — Chemistry spectral data representations, accessible descriptions, and SVG rendering.
 *
 * Implements:
 * - IR, 1H-NMR, 13C-NMR, Mass Spectrometry, and UV-Vis peak representations.
 * - Screen-reader accessible alternative table/text generation (WCAG AAA).
 * - Safe SVG spectral visualization chart generator without DOM or script dependencies.
 *
 * No academic approval inferred from software validation.
 */

import {escapeHtml} from '../../runtime/rendering.ts';
import type { ChemicalSpectrum, SpectralPeak, SpectrumType } from './types.ts';

/**
 * Returns human-readable label for a multiplicity code.
 */
export function formatMultiplicity(mult?: string): string {
  switch (mult) {
    case 's':
      return 'singlet';
    case 'd':
      return 'doublet';
    case 't':
      return 'triplet';
    case 'q':
      return 'quartet';
    case 'm':
      return 'multiplet';
    case 'br':
      return 'broad';
    default:
      return mult || 'peak';
  }
}

/**
 * Generates an accessible, screen-reader friendly narrative and table of peaks.
 */
export function generateAccessibleSpectraText(spectrum: ChemicalSpectrum): string {
  if (spectrum.accessibleDescription && spectrum.accessibleDescription.trim().length > 0) {
    return spectrum.accessibleDescription;
  }

  const peakCount = spectrum.peaks.length;
  if (peakCount === 0) {
    return `${spectrum.title} (${spectrum.type}) contains no reported peaks.`;
  }

  let text = `${spectrum.title} (${spectrum.type}): ${peakCount} distinct peak${peakCount === 1 ? '' : 's'} identified.`;

  const peakDescriptions = spectrum.peaks.map((p, idx) => {
    let pDesc = `Peak ${idx + 1}: ${p.position} ${spectrum.unit} (intensity ${(p.intensity * 100).toFixed(0)}%)`;
    if (p.multiplicity) {
      pDesc += `, ${formatMultiplicity(p.multiplicity)}`;
    }
    if (p.integration) {
      pDesc += `, integration ${p.integration}H`;
    }
    if (p.label) {
      pDesc += `, assigned to ${p.label}`;
    }
    return pDesc;
  });

  return `${text}\n${peakDescriptions.join('; ')}.`;
}

/**
 * Generates an SVG spectrum graph for tablet display.
 */
export function validateSpectrum(s:ChemicalSpectrum):void{if(!s.id||!Array.isArray(s.peaks)||s.peaks.length>10000||!['IR','NMR_1H','NMR_13C','UV_VIS','MASS_SPEC'].includes(s.type)||s.peaks.some(p=>!Number.isFinite(p.position)||!Number.isFinite(p.intensity)||p.intensity<0||p.intensity>1||p.integration!==undefined&&(!Number.isFinite(p.integration)||p.integration<0)))throw Error('Invalid spectrum');}
export function renderSpectrumSvg(
  spectrum: ChemicalSpectrum,
  width: number = 400,
  height: number = 220
): string {
  validateSpectrum(spectrum);if(!Number.isFinite(width)||!Number.isFinite(height)||width<100||height<100)throw Error('Invalid SVG dimensions');
  const padding = { top: 30, right: 20, bottom: 40, left: 50 };
  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;

  const accessibleText = generateAccessibleSpectraText(spectrum);

  if (spectrum.peaks.length === 0) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-label="${escapeHtml(accessibleText)}">
      <rect width="100%" height="100%" fill="#f8fafc" stroke="#cbd5e1" rx="8"/>
      <text x="${width / 2}" y="${height / 2}" text-anchor="middle" font-family="system-ui, sans-serif" font-size="14" fill="#64748b">No peaks recorded in spectrum</text>
    </svg>`;
  }

  // Determine x-axis bounds
  const positions = spectrum.peaks.map((p) => p.position);
  let minX = Math.min(...positions);
  let maxX = Math.max(...positions);

  // Pad x bounds slightly
  const rangeX = maxX - minX || 1;
  minX = minX - rangeX * 0.1;
  maxX = maxX + rangeX * 0.1;

  // Inverted axis for IR (4000 to 500) and NMR (12 to 0 ppm)
  const isInverted = spectrum.type === 'IR' || spectrum.type === 'NMR_1H' || spectrum.type === 'NMR_13C';

  const mapX = (val: number): number => {
    const norm = (val - minX) / (maxX - minX);
    return isInverted
      ? padding.left + (1 - norm) * plotWidth
      : padding.left + norm * plotWidth;
  };

  const mapY = (intensity: number): number => {
    // Normalizes 0..1 to bottom..top
    const clamped = Math.max(0, Math.min(1, intensity));
    return padding.top + (1 - clamped) * plotHeight;
  };

  // Peak lines
  const peakSvgLines = spectrum.peaks
    .map((p) => {
      const x = mapX(p.position);
      const y = mapY(p.intensity);
      const baselineY = padding.top + plotHeight;
      const labelY = Math.max(padding.top + 10, y - 6);
      const labelText = p.label || `${p.position}`;

      return `
        <line x1="${x.toFixed(1)}" y1="${baselineY.toFixed(1)}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="#2563eb" stroke-width="2.5" />
        <circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3" fill="#1d4ed8" />
        <text x="${x.toFixed(1)}" y="${labelY.toFixed(1)}" text-anchor="middle" font-family="system-ui, sans-serif" font-size="10" fill="#1e293b">${escapeHtml(labelText)}</text>
      `;
    })
    .join('');

  const baselineY = padding.top + plotHeight;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-label="${escapeHtml(accessibleText)}">
  <rect width="100%" height="100%" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5" rx="8"/>
  <text x="${padding.left}" y="20" font-family="system-ui, sans-serif" font-size="14" font-weight="600" fill="#0f172a">${escapeHtml(spectrum.title)} (${escapeHtml(spectrum.type)})</text>
  <!-- Axes -->
  <line x1="${padding.left}" y1="${baselineY}" x2="${width - padding.right}" y2="${baselineY}" stroke="#64748b" stroke-width="1.5"/>
  <line x1="${padding.left}" y1="${padding.top}" x2="${padding.left}" y2="${baselineY}" stroke="#64748b" stroke-width="1.5"/>
  <!-- Axis Labels -->
  <text x="${width / 2}" y="${height - 8}" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" fill="#475569">Position (${escapeHtml(spectrum.unit)})</text>
  <text x="12" y="${padding.top + plotHeight / 2}" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#475569" transform="rotate(-90 12 ${padding.top + plotHeight / 2})">Relative Intensity</text>
  <!-- Peak content -->
  ${peakSvgLines}
</svg>`;
}

