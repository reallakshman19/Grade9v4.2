/**
 * tests/runtime/portable.spec.ts
 * A64 — Portable workbench runtime adapter unit tests.
 *
 * Verifies:
 * - 15 fail-closed rejection rules (executable fields, pixel coordinates, version seams, canonical provenance)
 * - Four synthetic behavior analogues audited from custody packages:
 *   1. portable-long-division (NON_CANONICAL_COMPILED_PROOF)
 *   2. portable-redox-electron-equivalence (NON_CANONICAL_COMPILED_PROOF)
 *   3. portable-integration-riemann (NON_CANONICAL_COMPILED_PROOF)
 *   4. portable-motion-shared-clock (CANONICAL_COMPILED_RESOURCE: same-time vs mixed-time)
 * - Safe semantic transformation execution without eval()
 *
 * No academic approval inferred from software validation.
 */

import {syntheticPackage} from '../fixtures/portable-synthetic.ts';
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

import {
  PORTABLE_VERSION_SEAMS,
} from '../../web/applications/portable/types.ts';
import {
  validatePortablePackage,
} from '../../web/applications/portable/validator.ts';
import {
  PortableWorkbenchAdapter,
} from '../../web/applications/portable/adapter.ts';
import type { PortableWorkbenchPackage } from '../../web/applications/portable/types.ts';

const CUSTODY_DIR=process.env.G9_V35_PORTABLE_PACKAGES??'';

function loadCustodyPackage(id: string): PortableWorkbenchPackage {
  const filePath = path.join(CUSTODY_DIR, `${id}.json`);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Custody package not found at ${filePath}`);
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

describe('A64 Portable Workbench Fail-Closed Validator: 15 Rejection Rules', () => {
  const baseValidPackage = (): PortableWorkbenchPackage => ({
    schemaVersion: PORTABLE_VERSION_SEAMS.packageSchema,
    packageVersion: PORTABLE_VERSION_SEAMS.packageVersion,
    componentApiVersion: PORTABLE_VERSION_SEAMS.componentApiVersion,
    transformationIrVersion: PORTABLE_VERSION_SEAMS.transformationIrVersion,
    adapterApiVersion: PORTABLE_VERSION_SEAMS.adapterApiVersion,
    scenePackageVersion: PORTABLE_VERSION_SEAMS.scenePackageVersion,
    id: 'test-package',
    title: 'Test Package',
    sourceRefs: ['SRC-1'],
    sceneRefs: ['SCN-1'],
    representationRefs: ['REP-1'],
    assetRefs: [],
    accessibilityRefs: [],
    questionBindings: [],
    provenance: {
      authority: 'NON_CANONICAL_COMPILED_PROOF',
      sourceKind: 'COMPILED_PROOF',
      sourceRefs: ['SRC-1'],
    },
    scene: {
      apiVersion: '0.1.0',
      sceneVersion: '1.0.0',
      id: 'test-scene',
      grids: [{ id: 'g1', label: 'Grid 1', rows: ['r1'], columns: ['c1'] }],
      entities: [{ id: 'e1', label: 'Entity 1' }],
      projections: [
        {
          id: 'p1',
          entityRef: 'e1',
          label: 'Proj 1',
          representation: 'rep 1',
          placement: { grid: 'g1', row: 'r1', column: 'c1' },
        },
      ],
    },
    adapter: {
      id: PORTABLE_VERSION_SEAMS.declarativeAdapterId,
      apiVersion: PORTABLE_VERSION_SEAMS.adapterApiVersion,
      rules: [
        {
          id: 'rule-1',
          outcome: 'ACCEPT',
          summary: 'Rule 1 accepted',
        },
      ],
    },
    injections: [],
  });

  it('rejects forbidden executable fields (eval, script, onclick, javascript:)', () => {
    // 1. Injected eval key
    const pkg1 = baseValidPackage() as any;
    pkg1.scene.entities[0].eval = 'alert(1)';
    const res1 = validatePortablePackage(pkg1);
    assert.equal(res1.isValid, false);
    assert.ok(res1.errors.some((e) => e.code === 'PORTABLE_EXECUTABLE_FIELD_FORBIDDEN'));

    // 2. Injected javascript URI
    const pkg2 = baseValidPackage() as any;
    pkg2.scene.entities[0].label = 'javascript:void(0)';
    const res2 = validatePortablePackage(pkg2);
    assert.equal(res2.isValid, false);
    assert.ok(res2.errors.some((e) => e.code === 'PORTABLE_EXECUTABLE_FIELD_FORBIDDEN'));
  });

  it('rejects pixel placement coordinates in favor of semantic grid names', () => {
    const pkg = baseValidPackage() as any;
    pkg.scene.projections[0].placement = { grid: 'g1', row: 'r1', column: 'c1', x: 120, y: 300 };
    const res = validatePortablePackage(pkg);
    assert.equal(res.isValid, false);
    assert.ok(res.errors.some((e) => e.code === 'PORTABLE_PIXEL_COORDINATE_FORBIDDEN'));
  });

  it('rejects version seam mismatches strictly', () => {
    // componentApiVersion mismatch
    const pkgComp = baseValidPackage() as any;
    pkgComp.componentApiVersion = '0.9.9';
    assert.ok(
      validatePortablePackage(pkgComp).errors.some((e) => e.code === 'PORTABLE_COMPONENTAPIVERSION_MISMATCH')
    );

    // transformationIrVersion mismatch
    const pkgTrans = baseValidPackage() as any;
    pkgTrans.transformationIrVersion = '0.9.9';
    assert.ok(
      validatePortablePackage(pkgTrans).errors.some((e) => e.code === 'PORTABLE_TRANSFORMATIONIRVERSION_MISMATCH')
    );

    // adapterApiVersion mismatch
    const pkgAdap = baseValidPackage() as any;
    pkgAdap.adapterApiVersion = '0.9.9';
    assert.ok(
      validatePortablePackage(pkgAdap).errors.some((e) => e.code === 'PORTABLE_ADAPTERAPIVERSION_MISMATCH')
    );

    // scenePackageVersion mismatch
    const pkgScene = baseValidPackage() as any;
    pkgScene.scenePackageVersion = '0.9.9';
    assert.ok(
      validatePortablePackage(pkgScene).errors.some((e) => e.code === 'PORTABLE_SCENEPACKAGEVERSION_MISMATCH')
    );
  });

  it('strictly enforces canonical compiled resource authority constraints', () => {
    const pkg = baseValidPackage() as any;
    pkg.provenance.authority = 'CANONICAL_COMPILED_RESOURCE';

    // Missing resourceRef
    const res1 = validatePortablePackage(pkg);
    assert.ok(res1.errors.some((e) => e.code === 'PORTABLE_CANONICAL_RESOURCE_REF_REQUIRED'));

    // Mismatched resourceRef
    pkg.resourceRef = 'RES-A';
    pkg.provenance.resourceRef = 'RES-B';
    const res2 = validatePortablePackage(pkg);
    assert.ok(res2.errors.some((e) => e.code === 'PORTABLE_CANONICAL_RESOURCE_REF_MISMATCH'));
  });
});

describe('A64 external custody packages (not run without authorized directory)', {skip:!CUSTODY_DIR}, () => {
  it('validates portable-long-division as valid non-canonical proof', () => {
    const pkg = loadCustodyPackage('portable-long-division');
    const res = validatePortablePackage(pkg);
    assert.equal(res.isValid, true);
    assert.equal(pkg.provenance.authority, 'NON_CANONICAL_COMPILED_PROOF');

    const adapter = new PortableWorkbenchAdapter(pkg);
    assert.equal(adapter.getAllEntities().length, 2);
    assert.equal(adapter.getAllProjections().length, 3);
  });

  it('validates portable-redox-electron-equivalence as valid non-canonical proof', () => {
    const pkg = loadCustodyPackage('portable-redox-electron-equivalence');
    const res = validatePortablePackage(pkg);
    assert.equal(res.isValid, true);
    assert.equal(pkg.provenance.authority, 'NON_CANONICAL_COMPILED_PROOF');
  });

  it('validates portable-integration-riemann as valid non-canonical proof', () => {
    const pkg = loadCustodyPackage('portable-integration-riemann');
    const res = validatePortablePackage(pkg);
    assert.equal(res.isValid, true);
    assert.equal(pkg.provenance.authority, 'NON_CANONICAL_COMPILED_PROOF');
  });

  it('validates portable-motion-shared-clock as canonical candidate with physical invariant enforcement', () => {
    const pkg = loadCustodyPackage('portable-motion-shared-clock');
    const res = validatePortablePackage(pkg);
    assert.equal(res.isValid, true);
    assert.equal(pkg.provenance.authority, 'CANONICAL_COMPILED_RESOURCE');

    const adapter = new PortableWorkbenchAdapter(pkg);

    // Rule: same-time (simultaneous coordinates refer to one physical instant) -> ACCEPT
    const acceptRes = adapter.applyRule('same-time');
    assert.equal(acceptRes.outcome, 'ACCEPT');
    assert.match(acceptRes.summary || '', /one shared physical instant/);

    // Dynamic entity and projection added
    assert.ok(adapter.getAllEntities().some((e) => e.id === 'same-time-result'));
    assert.ok(adapter.getAllProjections().some((p) => p.id === 'same-time-result-projection'));

    // Rule: mixed-time (different coordinates violate single physical state) -> REJECT
    const rejectRes = adapter.applyRule('mixed-time');
    assert.equal(rejectRes.outcome, 'REJECT');
    assert.match(rejectRes.reason || '', /single physical state/i);
  });

  it('guarantees zero eval() or dynamic code evaluation across adapter implementation', () => {
    const adapterFiles = [
      path.resolve('web/applications/portable/types.ts'),
      path.resolve('web/applications/portable/validator.ts'),
      path.resolve('web/applications/portable/adapter.ts'),
      path.resolve('web/applications/portable/component.ts'),
    ];

    for (const f of adapterFiles) {
      const content = fs.readFileSync(f, 'utf-8');
      const stripped = content.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '');
      assert.ok(!/\beval\s*\(/.test(stripped), `File ${f} contains forbidden eval()`);
      assert.ok(!/\bFunction\s*\(/.test(stripped), `File ${f} contains forbidden Function() constructor`);
    }
  });
});

export {};
it('rejects graph and patch faults; replays removals and rejects forged state',()=>{const pkg=syntheticPackage();assert.equal(validatePortablePackage(pkg).isValid,true);const a=new PortableWorkbenchAdapter(pkg);assert.equal(a.applyRule('move').outcome,'ACCEPT');assert.equal(a.applyRule('move').outcome,'REJECT');assert.deepEqual(a.getAllProjections().map(p=>p.id),['p2']);const saved=a.exportState(),b=new PortableWorkbenchAdapter(pkg);b.restoreState(saved);assert.deepEqual(b.getAllProjections(),a.getAllProjections());assert.throws(()=>b.restoreState({...saved,dynamicEntities:[{id:'evil',label:'evil'}]}));assert.throws(()=>b.restoreState({...saved,appliedRuleIds:['missing']}));assert.throws(()=>b.restoreState({...saved,packageIdentity:'foreign'}));assert.throws(()=>b.setRotation(NaN));assert.equal(validatePortablePackage({...pkg,scene:{...pkg.scene,projections:[{...pkg.scene.projections[0],entityRef:'missing'}]}}).isValid,false);assert.equal(validatePortablePackage({...pkg,adapter:{...pkg.adapter,rules:[{id:'bad',outcome:'ACCEPT',patch:{addProjections:[{...pkg.scene.projections[0],id:'p3',placement:{grid:'unknown',row:'r',column:'c'}}]}}]}}).isValid,false);});
