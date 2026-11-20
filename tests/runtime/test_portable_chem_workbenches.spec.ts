import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { REDOX_ELECTRON_EQUIVALENCE_PACKAGE } from '../../web/runtime/chem-packages.ts';
import { validatePortablePackage } from '../../web/applications/portable/validator.ts';
import { PortableWorkbenchAdapter } from '../../web/applications/portable/adapter.ts';
import type { PortableWorkbenchPackage } from '../../web/applications/portable/types.ts';

describe('Gate P7-G5: Declarative Redox Portable Package (DEC-A59) & Fail-Closed Validation', () => {
  it('validates REDOX_ELECTRON_EQUIVALENCE_PACKAGE under strict schema and provenance rules', () => {
    const res = validatePortablePackage(REDOX_ELECTRON_EQUIVALENCE_PACKAGE);
    assert.equal(res.isValid, true, `Package failed validation: ${JSON.stringify(res.errors)}`);
    assert.equal(res.errors.length, 0);

    // Provenance integrity
    assert.equal(REDOX_ELECTRON_EQUIVALENCE_PACKAGE.provenance.authority, 'NON_CANONICAL_COMPILED_PROOF');
    assert.equal(REDOX_ELECTRON_EQUIVALENCE_PACKAGE.provenance.sourceKind, 'COMPILED_PROOF_FIXTURE');
    assert.equal(REDOX_ELECTRON_EQUIVALENCE_PACKAGE.id, 'portable-redox-electron-equivalence');
    assert.equal(REDOX_ELECTRON_EQUIVALENCE_PACKAGE.scene.id, 'redox-electron-equivalence-proof');
  });

  it('rejects forbidden executable and script injection in package hierarchy', () => {
    // 1. Executable field injection
    const forged1 = structuredClone(REDOX_ELECTRON_EQUIVALENCE_PACKAGE) as any;
    forged1.scene.entities[0].onclick = "alert('exploit')";
    const res1 = validatePortablePackage(forged1);
    assert.equal(res1.isValid, false);
    assert.ok(res1.errors.some(e => e.code === 'PORTABLE_EXECUTABLE_FIELD_FORBIDDEN'));

    // 2. javascript: URI injection
    const forged2 = structuredClone(REDOX_ELECTRON_EQUIVALENCE_PACKAGE) as any;
    forged2.title = 'javascript:void(0)';
    const res2 = validatePortablePackage(forged2);
    assert.equal(res2.isValid, false);
    assert.ok(res2.errors.some(e => e.code === 'PORTABLE_EXECUTABLE_FIELD_FORBIDDEN'));
  });

  it('rejects absolute pixel placement keys to enforce semantic layout', () => {
    const forged = structuredClone(REDOX_ELECTRON_EQUIVALENCE_PACKAGE) as any;
    forged.scene.projections[0].placement.x = 150;
    const res = validatePortablePackage(forged);
    assert.equal(res.isValid, false);
    assert.ok(res.errors.some(e => e.code === 'PORTABLE_PIXEL_COORDINATE_FORBIDDEN'));
  });

  it('rejects version mismatches across all 4 portable version seams', () => {
    // Seam 1: componentApiVersion
    const badComp = structuredClone(REDOX_ELECTRON_EQUIVALENCE_PACKAGE);
    (badComp as any).componentApiVersion = '9.9.9';
    assert.equal(validatePortablePackage(badComp).isValid, false);

    // Seam 2: transformationIrVersion
    const badTrans = structuredClone(REDOX_ELECTRON_EQUIVALENCE_PACKAGE);
    (badTrans as any).transformationIrVersion = '9.9.9';
    assert.equal(validatePortablePackage(badTrans).isValid, false);

    // Seam 3: adapterApiVersion
    const badAdapter = structuredClone(REDOX_ELECTRON_EQUIVALENCE_PACKAGE);
    (badAdapter as any).adapterApiVersion = '9.9.9';
    assert.equal(validatePortablePackage(badAdapter).isValid, false);

    // Seam 4: scenePackageVersion
    const badScene = structuredClone(REDOX_ELECTRON_EQUIVALENCE_PACKAGE);
    (badScene as any).scenePackageVersion = '9.9.9';
    assert.equal(validatePortablePackage(badScene).isValid, false);
  });

  it('enforces expected canonical resource and representation bindings fail-closed', () => {
    // Mismatched expected resource ref (Rule 13)
    const badResource = validatePortablePackage(REDOX_ELECTRON_EQUIVALENCE_PACKAGE, {
      expectedResourceRef: 'nonexistent-resource-ref',
    });
    assert.equal(badResource.isValid, false);
    assert.ok(badResource.errors.some(e => e.code === 'PORTABLE_RESOURCE_BINDING_MISMATCH'));

    // Mismatched expected representation ref (Rule 14)
    const badRep = validatePortablePackage(REDOX_ELECTRON_EQUIVALENCE_PACKAGE, {
      expectedRepresentationRef: 'quantum-tunneling-diagram',
    });
    assert.equal(badRep.isValid, false);
    assert.ok(badRep.errors.some(e => e.code === 'PORTABLE_REPRESENTATION_BINDING_MISMATCH'));
  });

  it('rejects structural corruption in adapter rules, targets and projections', () => {
    // 1. Unknown rule outcome
    const badOutcome = structuredClone(REDOX_ELECTRON_EQUIVALENCE_PACKAGE) as any;
    badOutcome.adapter.rules[0].outcome = 'PERMISSIVE_ALLOW';
    assert.equal(validatePortablePackage(badOutcome).isValid, false);

    // 2. Missing transformationRef in rule
    const badTransRef = structuredClone(REDOX_ELECTRON_EQUIVALENCE_PACKAGE) as any;
    delete badTransRef.adapter.rules[0].transformationRef;
    assert.equal(validatePortablePackage(badTransRef).isValid, false);

    // 3. Missing patch on ACCEPT rule
    const badPatch = structuredClone(REDOX_ELECTRON_EQUIVALENCE_PACKAGE) as any;
    badPatch.adapter.rules[0].outcome = 'ACCEPT';
    delete badPatch.adapter.rules[0].patch;
    assert.equal(validatePortablePackage(badPatch).isValid, false);

    // 4. Missing reason on REJECT rule
    const badReject = structuredClone(REDOX_ELECTRON_EQUIVALENCE_PACKAGE) as any;
    badReject.adapter.rules[0].outcome = 'REJECT';
    delete badReject.adapter.rules[0].patch;
    delete badReject.adapter.rules[0].reason;
    assert.equal(validatePortablePackage(badReject).isValid, false);

    // 5. Dangling projection entityRef
    const badEntityRef = structuredClone(REDOX_ELECTRON_EQUIVALENCE_PACKAGE) as any;
    badEntityRef.scene.projections[0].entityRef = 'dangling-entity-id';
    assert.equal(validatePortablePackage(badEntityRef).isValid, false);

    // 6. Duplicate entity ID
    const dupEntity = structuredClone(REDOX_ELECTRON_EQUIVALENCE_PACKAGE) as any;
    dupEntity.scene.entities.push({ id: dupEntity.scene.entities[0].id, label: 'Duplicate' });
    assert.equal(validatePortablePackage(dupEntity).isValid, false);
  });

  it('executes declarative redox rule via PortableWorkbenchAdapter with full state restore', () => {
    const pkg = REDOX_ELECTRON_EQUIVALENCE_PACKAGE;
    const adapter = new PortableWorkbenchAdapter(pkg);

    const initialRule = pkg.adapter.rules[0]!;
    assert.ok(initialRule.sourceEntityRef);

    adapter.setActiveEntityId(initialRule.sourceEntityRef);
    const result = adapter.applyRule(initialRule.id);

    assert.equal(result.outcome, 'ACCEPT');
    assert.ok(result.summary);

    // Verify entity/projection added by patch
    const projections = adapter.getAllProjections();
    assert.ok(projections.some(p => p.representation === 'electron equivalence'));

    // Roundtrip state export and restore
    const savedState = adapter.exportState();
    const restoredAdapter = new PortableWorkbenchAdapter(pkg);
    restoredAdapter.restoreState(savedState);
    assert.deepEqual(restoredAdapter.exportState(), savedState);
  });
});
