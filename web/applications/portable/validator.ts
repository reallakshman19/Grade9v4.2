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

const EXECUTABLE_KEY_REGEX=/^(script|javascript|eval|function|handler|on[a-z]+|sourcecode|executable|__proto__|constructor|prototype)$/i;
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
  const projections = Array.isArray(pkg.scene?.projections)?pkg.scene.projections:[];

  for (let i = 0; i < projections.length; i++) {
    const proj = projections[i]!;
    const placement = proj?.placement as unknown as Record<string, unknown>;

    if (!placement || typeof placement !== 'object') {
      errors.push({
        code: 'PORTABLE_PIXEL_COORDINATE_FORBIDDEN',
        message: `Projection "${proj?.id}" missing semantic placement object.`,
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


function record(x:unknown):x is Record<string,any>{return !!x&&typeof x==='object'&&!Array.isArray(x)&&[Object.prototype,null].includes(Object.getPrototypeOf(x));}
const textOk=(v:unknown):v is string=>typeof v==='string'&&v.trim().length>0&&v.length<=8192;
const idOk=(v:unknown):v is string=>typeof v==='string'&&/^[A-Za-z0-9_.:-]{1,128}$/.test(v);
const list=(v:unknown):v is any[]=>Array.isArray(v)&&v.length<=4096;
const strings=(v:unknown):v is string[]=>list(v)&&v.every(textOk)&&new Set(v).size===v.length;
function boundedJson(v:unknown,depth=0,seen=new Set<object>(),budget={n:0}):boolean{
 if(++budget.n>100000||depth>32)return false;
 if(v===null||typeof v==='boolean')return true;if(typeof v==='number')return Number.isFinite(v);if(typeof v==='string')return v.length<=8192;
 if(!v||typeof v!=='object'||seen.has(v))return false;seen.add(v);
 const ok=Array.isArray(v)?v.length<=4096&&Array.from(v).every(x=>boundedJson(x,depth+1,seen,budget)):record(v)&&Object.keys(v).length<=4096&&Object.values(v).every(x=>boundedJson(x,depth+1,seen,budget));seen.delete(v);return ok;
}
function shape(p:any):boolean{
 if(!record(p)||!idOk(p.id)||!textOk(p.title)||!['sourceRefs','sceneRefs','representationRefs'].every(k=>strings(p[k]))||!['assetRefs','accessibilityRefs','questionBindings'].every(k=>list(p[k]))||!record(p.provenance)||!['CANONICAL_COMPILED_RESOURCE','NON_CANONICAL_COMPILED_PROOF'].includes(p.provenance.authority)||!record(p.scene)||!record(p.adapter))return false;
 if(p.provenance.sourceRefs!==undefined&&!strings(p.provenance.sourceRefs)||p.injections!==undefined&&(!list(p.injections)||p.injections.length>0))return false;
 const s=p.scene,a=p.adapter;
 if(!idOk(s.id)||!list(s.grids)||!s.grids.length||!list(s.entities)||!list(s.projections)||!list(a.rules)||s.targets!==undefined&&!list(s.targets)||s.canonicalTransformations!==undefined&&!list(s.canonicalTransformations))return false;
 const unique=(xs:any[])=>xs.every(x=>record(x)&&idOk(x.id))&&new Set(xs.map(x=>x.id)).size===xs.length;
 if(![s.grids,s.entities,s.projections,a.rules,s.canonicalTransformations??[]].every(unique))return false;
 if(!s.grids.every((g:any)=>textOk(g.label)&&strings(g.rows)&&g.rows.length&&strings(g.columns)&&g.columns.length&&g.rows.length*g.columns.length<=10000))return false;
 const entity=(e:any)=>record(e)&&idOk(e.id)&&textOk(e.label);
 const placement=(x:any)=>record(x)&&Object.keys(x).sort().join(',')==='column,grid,row'&&s.grids.some((g:any)=>g.id===x.grid&&g.rows.includes(x.row)&&g.columns.includes(x.column));
 const projection=(q:any)=>record(q)&&idOk(q.id)&&idOk(q.entityRef)&&textOk(q.label)&&textOk(q.representation)&&placement(q.placement);
 if(!s.entities.every(entity)||!s.projections.every(projection)||s.projections.some((q:any)=>!s.entities.some((e:any)=>e.id===q.entityRef)))return false;
 const targets=s.targets??[],transforms=s.canonicalTransformations??[];
 const targetIds=new Set(targets.filter(record).map((t:any)=>t.id));
 if(targets.some((t:any)=>!record(t)||!idOk(t.id))||targetIds.size!==targets.length||transforms.some((t:any)=>!strings(t.sourceEntityRefs)||!t.sourceEntityRefs.length||t.sourceEntityRefs.some((id:string)=>!s.entities.some((e:any)=>e.id===id))||!targetIds.has(t.targetRef)))return false;
 for(const r of a.rules){
  if(!['ACCEPT','REJECT'].includes(r.outcome===undefined?'ACCEPT':r.outcome)||r.transformationRef!==undefined&&!transforms.some((t:any)=>t.id===r.transformationRef)||r.sourceEntityRef!==undefined&&!s.entities.some((e:any)=>e.id===r.sourceEntityRef)||r.targetRef!==undefined&&!targetIds.has(r.targetRef))return false;
  // Native omitted outcome means ACCEPT only for a complete, bound transformation patch.
  if(r.outcome===undefined&&(!record(r.patch)||!idOk(r.transformationRef)||!idOk(r.sourceEntityRef)||!idOk(r.targetRef)||!textOk(r.operation)||targets.find((t:any)=>t.id===r.targetRef)?.operation!==r.operation))return false;
  if(r.transformationRef!==undefined){const t=transforms.find((t:any)=>t.id===r.transformationRef);if(r.sourceEntityRef!==undefined&&!t.sourceEntityRefs.includes(r.sourceEntityRef)||r.targetRef!==undefined&&r.targetRef!==t.targetRef)return false;}
  if(r.summary!==undefined&&!textOk(r.summary)||r.reason!==undefined&&!textOk(r.reason))return false;
  if(r.patch!==undefined){const q=r.patch;if((r.outcome===undefined?'ACCEPT':r.outcome)!=='ACCEPT'||!record(q)||Object.keys(q).some(k=>!['addEntities','addProjections','removeProjections'].includes(k)))return false;
   const es=q.addEntities??[],ps=q.addProjections??[],rm=q.removeProjections??[];
   if(!list(es)||!unique(es)||!es.every(entity)||!list(ps)||!unique(ps)||!ps.every(projection)||!strings(rm)||es.some((e:any)=>s.entities.some((x:any)=>x.id===e.id))||ps.some((q:any)=>s.projections.some((x:any)=>x.id===q.id)||![...s.entities,...es].some((e:any)=>e.id===q.entityRef))||rm.some((id:string)=>!s.projections.some((q:any)=>q.id===id)))return false;
  }
 }
 return true;
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

  if(!boundedJson(pkg)){return {isValid:false,errors:[{code:'PORTABLE_INVALID_GRAPH',message:'Invalid, cyclic or oversized JSON'}]};}
  // Rule 1: Executable fields forbidden
  scanForExecutableKeys(pkg, '', errors);
  if(!shape(pkg))errors.push({code:'PORTABLE_INVALID_GRAPH',message:'Invalid graph, identity, semantic placement or patch closure'});
  if(pkg.schemaVersion!==PORTABLE_VERSION_SEAMS.packageSchema||pkg.packageVersion!==PORTABLE_VERSION_SEAMS.packageVersion||pkg.scene?.apiVersion!==PORTABLE_VERSION_SEAMS.componentApiVersion||pkg.scene?.sceneVersion!==PORTABLE_VERSION_SEAMS.scenePackageVersion||pkg.adapter?.id!==PORTABLE_VERSION_SEAMS.declarativeAdapterId||pkg.adapter?.apiVersion!==PORTABLE_VERSION_SEAMS.adapterApiVersion)errors.push({code:'PORTABLE_VERSION_MISMATCH',message:'Package, scene or adapter version mismatch'});

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
      (!Array.isArray(pkg.representationRefs) || !pkg.representationRefs.includes(pkg.provenance.representationRef))
    ) {
      errors.push({
        code: 'PORTABLE_CANONICAL_REPRESENTATION_REF_MISMATCH',
        message: `provenance.representationRef "${pkg.provenance.representationRef}" is not in representationRefs list.`,
        field: 'provenance.representationRef',
      });
    }

    // Rule 11: CANONICAL_SOURCE_REFS_REQUIRED
    if (!Array.isArray(pkg.provenance.sourceRefs) || pkg.provenance.sourceRefs.length === 0) {
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
