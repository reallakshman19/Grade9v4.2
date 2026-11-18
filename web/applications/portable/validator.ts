/**
 * web/applications/portable/validator.ts
 * A64 — Portable workbench fail-closed package validator.
 *
 * Implements:
 * - Fifteen native rejection rules enforcing strict security and structural constraints:
 *   1. PORTABLE_EXECUTABLE_FIELD_FORBIDDEN (no eval, script, onclick, javascript, handlers)
 *   2. PORTABLE_PIXEL_COORDINATE_FORBIDDEN (no pixel x/y/width/height placements; semantic grids only)
 *   3. PORTABLE_COMPONENTAPIVERSION_MISMATCH (0.1.0)
 *   4. PORTABLE_TRANSFORMATIONIRVERSION_MISMATCH (0.1.0)
 *   5. PORTABLE_ADAPTERAPIVERSION_MISMATCH (0.2.0)
 *   6. PORTABLE_SCENEPACKAGEVERSION_MISMATCH (1.0.0)
 *   7. PORTABLE_CANONICAL_RESOURCE_REF_REQUIRED
 *   8. PORTABLE_CANONICAL_RESOURCE_REF_MISMATCH
 *   9. PORTABLE_CANONICAL_REPRESENTATION_REF_REQUIRED
 *   10. PORTABLE_CANONICAL_REPRESENTATION_REF_MISMATCH
 *   11. PORTABLE_CANONICAL_SOURCE_REFS_REQUIRED
 *   12. PORTABLE_CANONICAL_SOURCE_REFS_MISMATCH
 *   13. PORTABLE_RESOURCE_BINDING_MISMATCH
 *   14. PORTABLE_REPRESENTATION_BINDING_MISMATCH
 *   15. PORTABLE_PACKAGE_NOT_FOUND
 *
 * No academic approval inferred from software validation.
 */

import { PORTABLE_VERSION_SEAMS } from './types.ts';
import type {
  PortableWorkbenchPackage,
  PortableValidationError,
} from './types.ts';

const EXECUTABLE_KEY_REGEX = /^(script|javascript|eval|function|handler|onclick|onload|onerror|sourcecode|executable)$/i;
const PIXEL_KEYS = new Set(['x', 'y', 'left', 'top', 'width', 'height', 'bottom', 'right']);

/**
 * Recursively scans arbitrary objects or arrays for forbidden executable field names.
 */
function scanForExecutableKeys(obj: unknown, path: string = '', errors: PortableValidationError[]): void {
  if (!obj || typeof obj !== 'object') return;

  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      scanForExecutableKeys(obj[i], `${path}[${i}]`, errors);
    }
    return;
  }

  for (const [key, value] of Object.entries(obj)) {
    const currentPath = path ? `${path}.${key}` : key;
    if (EXECUTABLE_KEY_REGEX.test(key)) {
      errors.push({
        code: 'PORTABLE_EXECUTABLE_FIELD_FORBIDDEN',
        message: `Field "${currentPath}" uses forbidden executable keyword "${key}".`,
        field: currentPath,
      });
    }

    if (typeof value === 'string' && value.toLowerCase().includes('javascript:')) {
      errors.push({
        code: 'PORTABLE_EXECUTABLE_FIELD_FORBIDDEN',
        message: `Field "${currentPath}" contains forbidden executable URI protocol "javascript:".`,
        field: currentPath,
      });
    }

    scanForExecutableKeys(value, currentPath, errors);
  }
}

/**
 * Validates scene projection placements to ensure named semantic grids are used,
 * strictly rejecting pixel/absolute coordinates.
 */
function scanForPixelPlacements(pkg: PortableWorkbenchPackage, errors: PortableValidationError[]): void {
  const projections = pkg.scene?.projections || [];

  for (let i = 0; i < projections.length; i++) {
    const proj = projections[i]!;
    const placement = proj.placement as unknown as Record<string, unknown>;

    if (!placement || typeof placement !== 'object') {
      errors.push({
        code: 'PORTABLE_PIXEL_COORDINATE_FORBIDDEN',
        message: `Projection "${proj.id}" missing semantic placement object.`,
        field: `scene.projections[${i}].placement`,
      });
      continue;
    }

    // Check for pixel keys
    for (const key of Object.keys(placement)) {
      if (PIXEL_KEYS.has(key.toLowerCase())) {
        errors.push({
          code: 'PORTABLE_PIXEL_COORDINATE_FORBIDDEN',
          message: `Projection "${proj.id}" placement contains forbidden pixel coordinate "${key}". Named grid, row, and column required.`,
          field: `scene.projections[${i}].placement.${key}`,
        });
      }
    }

    // Enforce required grid, row, column strings
    if (
      typeof placement['grid'] !== 'string' ||
      typeof placement['row'] !== 'string' ||
      typeof placement['column'] !== 'string'
    ) {
      errors.push({
        code: 'PORTABLE_PIXEL_COORDINATE_FORBIDDEN',
        message: `Projection "${proj.id}" placement must specify string "grid", "row", and "column".`,
        field: `scene.projections[${i}].placement`,
      });
    }
  }
}

export interface ValidationOptions {
  readonly expectedResourceRef?: string;
  readonly expectedRepresentationRef?: string;
}

/**
 * Validates a declarative portable workbench package under all 15 native rejection rules.
 */
export function validatePortablePackage(
  pkg: PortableWorkbenchPackage,
  options?: ValidationOptions
): { isValid: boolean; errors: readonly PortableValidationError[] } {
  const errors: PortableValidationError[] = [];

  if (!pkg || typeof pkg !== 'object') {
    return {
      isValid: false,
      errors: [
        {
          code: 'PORTABLE_PACKAGE_NOT_FOUND',
          message: 'Package payload is missing or not an object.',
        },
      ],
    };
  }

  // Rule 1: Executable fields forbidden
  scanForExecutableKeys(pkg, '', errors);

  // Rule 2: Pixel coordinates forbidden
  scanForPixelPlacements(pkg, errors);

  // Rule 3: componentApiVersion mismatch
  if (pkg.componentApiVersion !== PORTABLE_VERSION_SEAMS.componentApiVersion) {
    errors.push({
      code: 'PORTABLE_COMPONENTAPIVERSION_MISMATCH',
      message: `Expected componentApiVersion "${PORTABLE_VERSION_SEAMS.componentApiVersion}", got "${pkg.componentApiVersion}".`,
      field: 'componentApiVersion',
    });
  }

  // Rule 4: transformationIrVersion mismatch
  if (pkg.transformationIrVersion !== PORTABLE_VERSION_SEAMS.transformationIrVersion) {
    errors.push({
      code: 'PORTABLE_TRANSFORMATIONIRVERSION_MISMATCH',
      message: `Expected transformationIrVersion "${PORTABLE_VERSION_SEAMS.transformationIrVersion}", got "${pkg.transformationIrVersion}".`,
      field: 'transformationIrVersion',
    });
  }

  // Rule 5: adapterApiVersion mismatch
  if (pkg.adapterApiVersion !== PORTABLE_VERSION_SEAMS.adapterApiVersion) {
    errors.push({
      code: 'PORTABLE_ADAPTERAPIVERSION_MISMATCH',
      message: `Expected adapterApiVersion "${PORTABLE_VERSION_SEAMS.adapterApiVersion}", got "${pkg.adapterApiVersion}".`,
      field: 'adapterApiVersion',
    });
  }

  // Rule 6: scenePackageVersion mismatch
  if (pkg.scenePackageVersion !== PORTABLE_VERSION_SEAMS.scenePackageVersion) {
    errors.push({
      code: 'PORTABLE_SCENEPACKAGEVERSION_MISMATCH',
      message: `Expected scenePackageVersion "${PORTABLE_VERSION_SEAMS.scenePackageVersion}", got "${pkg.scenePackageVersion}".`,
      field: 'scenePackageVersion',
    });
  }

  // Provenance Authority Checks (Rules 7-12)
  const isCanonical = pkg.provenance?.authority === 'CANONICAL_COMPILED_RESOURCE';

  if (isCanonical) {
    // Rule 7: CANONICAL_RESOURCE_REF_REQUIRED
    if (!pkg.resourceRef) {
      errors.push({
        code: 'PORTABLE_CANONICAL_RESOURCE_REF_REQUIRED',
        message: 'Authority is CANONICAL_COMPILED_RESOURCE but top-level resourceRef is missing or empty.',
        field: 'resourceRef',
      });
    }

    // Rule 8: CANONICAL_RESOURCE_REF_MISMATCH
    if (pkg.resourceRef !== pkg.provenance.resourceRef) {
      errors.push({
        code: 'PORTABLE_CANONICAL_RESOURCE_REF_MISMATCH',
        message: `Top-level resourceRef "${pkg.resourceRef}" does not match provenance.resourceRef "${pkg.provenance.resourceRef}".`,
        field: 'resourceRef',
      });
    }

    // Rule 9: CANONICAL_REPRESENTATION_REF_REQUIRED
    if (!pkg.provenance.representationRef) {
      errors.push({
        code: 'PORTABLE_CANONICAL_REPRESENTATION_REF_REQUIRED',
        message: 'Authority is CANONICAL_COMPILED_RESOURCE but provenance.representationRef is missing.',
        field: 'provenance.representationRef',
      });
    }

    // Rule 10: CANONICAL_REPRESENTATION_REF_MISMATCH
    if (
      pkg.provenance.representationRef &&
      (!pkg.representationRefs || !pkg.representationRefs.includes(pkg.provenance.representationRef))
    ) {
      errors.push({
        code: 'PORTABLE_CANONICAL_REPRESENTATION_REF_MISMATCH',
        message: `provenance.representationRef "${pkg.provenance.representationRef}" is not in representationRefs list.`,
        field: 'provenance.representationRef',
      });
    }

    // Rule 11: CANONICAL_SOURCE_REFS_REQUIRED
    if (!pkg.provenance.sourceRefs || pkg.provenance.sourceRefs.length === 0) {
      errors.push({
        code: 'PORTABLE_CANONICAL_SOURCE_REFS_REQUIRED',
        message: 'Authority is CANONICAL_COMPILED_RESOURCE but provenance.sourceRefs is empty or missing.',
        field: 'provenance.sourceRefs',
      });
    }

    // Rule 12: CANONICAL_SOURCE_REFS_MISMATCH
    if (
      pkg.provenance.sourceRefs &&
      pkg.sourceRefs &&
      JSON.stringify(pkg.provenance.sourceRefs) !== JSON.stringify(pkg.sourceRefs)
    ) {
      errors.push({
        code: 'PORTABLE_CANONICAL_SOURCE_REFS_MISMATCH',
        message: 'provenance.sourceRefs does not exactly match top-level sourceRefs.',
        field: 'provenance.sourceRefs',
      });
    }
  }

  // Visual Target Bindings (Rules 13-14)
  if (options?.expectedResourceRef && pkg.resourceRef !== options.expectedResourceRef) {
    errors.push({
      code: 'PORTABLE_RESOURCE_BINDING_MISMATCH',
      message: `Requested visual target resourceRef "${options.expectedResourceRef}" does not match package resourceRef "${pkg.resourceRef}".`,
      field: 'resourceRef',
    });
  }

  if (
    options?.expectedRepresentationRef &&
    pkg.provenance?.representationRef !== options.expectedRepresentationRef
  ) {
    errors.push({
      code: 'PORTABLE_REPRESENTATION_BINDING_MISMATCH',
      message: `Requested visual target representationRef "${options.expectedRepresentationRef}" does not match package representationRef "${pkg.provenance?.representationRef}".`,
      field: 'provenance.representationRef',
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
