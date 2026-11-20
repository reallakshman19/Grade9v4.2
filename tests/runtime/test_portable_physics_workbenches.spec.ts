import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { MOTION_SHARED_CLOCK_PACKAGE } from '../../web/runtime/physics-packages.ts';
import { validatePortablePackage } from '../../web/applications/portable/validator.ts';
import { PortableWorkbenchAdapter } from '../../web/applications/portable/adapter.ts';

describe('Gate P8-G6: Declarative Motion Shared Clock Package (DEC-A59) & Fail-Closed Validation', () => {
  it('validates MOTION_SHARED_CLOCK_PACKAGE under strict schema and provenance rules', () => {
    const res = validatePortablePackage(MOTION_SHARED_CLOCK_PACKAGE);
    assert.equal(res.isValid, true, `Package failed validation: ${JSON.stringify(res.errors)}`);
    assert.equal(res.errors.length, 0);

    // Provenance integrity
    assert.equal(MOTION_SHARED_CLOCK_PACKAGE.provenance.authority, 'CANONICAL_COMPILED_RESOURCE');
    assert.equal(MOTION_SHARED_CLOCK_PACKAGE.provenance.sourceKind, 'CANONICAL_RESOURCE');
    assert.equal(MOTION_SHARED_CLOCK_PACKAGE.id, 'portable-motion-shared-clock');
    assert.equal(MOTION_SHARED_CLOCK_PACKAGE.scene.id, 'portable-motion-shared-clock-scene');
  });

  it('rejects forbidden executable and script injection in package hierarchy', () => {
    // 1. Executable field injection
    const forged1 = structuredClone(MOTION_SHARED_CLOCK_PACKAGE) as any;
    forged1.scene.entities[0].onclick = "alert('exploit')";
    const res1 = validatePortablePackage(forged1);
    assert.equal(res1.isValid, false);
    assert.ok(res1.errors.some(e => e.code === 'PORTABLE_EXECUTABLE_FIELD_FORBIDDEN'));

    // 2. javascript: URI injection
    const forged2 = structuredClone(MOTION_SHARED_CLOCK_PACKAGE) as any;
    forged2.title = 'javascript:void(0)';
    const res2 = validatePortablePackage(forged2);
    assert.equal(res2.isValid, false);
    assert.ok(res2.errors.some(e => e.code === 'PORTABLE_EXECUTABLE_FIELD_FORBIDDEN'));
  });

  it('rejects absolute pixel placement keys to enforce semantic layout', () => {
    const forged = structuredClone(MOTION_SHARED_CLOCK_PACKAGE) as any;
    forged.scene.projections[0].placement.x = 150;
    const res = validatePortablePackage(forged);
    assert.equal(res.isValid, false);
    assert.ok(res.errors.some(e => e.code === 'PORTABLE_PIXEL_COORDINATE_FORBIDDEN'));
  });

  it('rejects version mismatches across all 4 portable version seams', () => {
    // Seam 1: componentApiVersion
    const badComp = structuredClone(MOTION_SHARED_CLOCK_PACKAGE);
    (badComp as any).componentApiVersion = '9.9.9';
    assert.equal(validatePortablePackage(badComp).isValid, false);

    // Seam 2: transformationIrVersion
    const badTrans = structuredClone(MOTION_SHARED_CLOCK_PACKAGE);
    (badTrans as any).transformationIrVersion = '9.9.9';
    assert.equal(validatePortablePackage(badTrans).isValid, false);

    // Seam 3: adapterApiVersion
    const badAdapter = structuredClone(MOTION_SHARED_CLOCK_PACKAGE);
    (badAdapter as any).adapterApiVersion = '9.9.9';
    assert.equal(validatePortablePackage(badAdapter).isValid, false);

    // Seam 4: scenePackageVersion
    const badScene = structuredClone(MOTION_SHARED_CLOCK_PACKAGE);
    (badScene as any).scenePackageVersion = '9.9.9';
    assert.equal(validatePortablePackage(badScene).isValid, false);
  });

  it('enforces expected canonical resource and representation bindings fail-closed', () => {
    // Mismatched expected resource ref (Rule 13)
    const badResource = validatePortablePackage(MOTION_SHARED_CLOCK_PACKAGE, {
      expectedResourceRef: 'nonexistent-resource-ref',
    });
    assert.equal(badResource.isValid, false);
    assert.ok(badResource.errors.some(e => e.code === 'PORTABLE_RESOURCE_BINDING_MISMATCH'));

    // Mismatched expected representation ref (Rule 14)
    const badRep = validatePortablePackage(MOTION_SHARED_CLOCK_PACKAGE, {
      expectedRepresentationRef: 'nonexistent-rep-ref',
    });
    assert.equal(badRep.isValid, false);
    assert.ok(badRep.errors.some(e => e.code === 'PORTABLE_REPRESENTATION_BINDING_MISMATCH'));
  });

  it('rejects structural corruption in adapter rules, targets and projections', () => {
    // 1. Unknown rule outcome
    const badOutcome = structuredClone(MOTION_SHARED_CLOCK_PACKAGE) as any;
    badOutcome.adapter.rules[0].outcome = 'PERMISSIVE_ALLOW';
    assert.equal(validatePortablePackage(badOutcome).isValid, false);

    // 2. Missing transformationRef in rule
    const badTransRef = structuredClone(MOTION_SHARED_CLOCK_PACKAGE) as any;
    delete badTransRef.adapter.rules[0].transformationRef;
    assert.equal(validatePortablePackage(badTransRef).isValid, false);

    // 3. Missing patch on ACCEPT rule
    const badPatch = structuredClone(MOTION_SHARED_CLOCK_PACKAGE) as any;
    badPatch.adapter.rules[0].outcome = 'ACCEPT';
    delete badPatch.adapter.rules[0].patch;
    assert.equal(validatePortablePackage(badPatch).isValid, false);

    // 4. Missing reason on REJECT rule
    const badReject = structuredClone(MOTION_SHARED_CLOCK_PACKAGE) as any;
    badReject.adapter.rules[1].outcome = 'REJECT';
    delete badReject.adapter.rules[1].reason;
    assert.equal(validatePortablePackage(badReject).isValid, false);

    // 5. Dangling projection entityRef
    const badEntityRef = structuredClone(MOTION_SHARED_CLOCK_PACKAGE) as any;
    badEntityRef.scene.projections[0].entityRef = 'dangling-entity-id';
    assert.equal(validatePortablePackage(badEntityRef).isValid, false);

    // 6. Duplicate entity ID
    const dupEntity = structuredClone(MOTION_SHARED_CLOCK_PACKAGE) as any;
    dupEntity.scene.entities.push({ id: dupEntity.scene.entities[0].id, label: 'Duplicate' });
    assert.equal(validatePortablePackage(dupEntity).isValid, false);
  });

  it('executes declarative motion rules via PortableWorkbenchAdapter: accepts same-time, rejects mixed-time', () => {
    const pkg = MOTION_SHARED_CLOCK_PACKAGE;
    const adapter = new PortableWorkbenchAdapter(pkg);

    // 1. Same-time rule: ACCEPT
    const sameTimeRule = pkg.adapter.rules[0]!;
    assert.equal(sameTimeRule.id, 'same-time');
    assert.ok(sameTimeRule.sourceEntityRef);

    adapter.setActiveEntityId(sameTimeRule.sourceEntityRef);
    const result1 = adapter.applyRule(sameTimeRule.id);

    assert.equal(result1.outcome, 'ACCEPT');
    assert.ok(result1.summary);

    // Verify entity/projection added by patch
    const projections = adapter.getAllProjections();
    assert.ok(projections.some(p => p.representation === 'accepted canonical reconstruction'));

    // 2. Mixed-time rule: REJECT
    const mixedTimeRule = pkg.adapter.rules[1]!;
    assert.equal(mixedTimeRule.id, 'mixed-time');
    assert.ok(mixedTimeRule.sourceEntityRef);

    adapter.setActiveEntityId(mixedTimeRule.sourceEntityRef);
    const result2 = adapter.applyRule(mixedTimeRule.id);

    assert.equal(result2.outcome, 'REJECT');
    assert.ok(result2.reason?.includes('Mixing x at one time with y at another'));

    // 3. Roundtrip state export and restore
    const savedState = adapter.exportState();
    const restoredAdapter = new PortableWorkbenchAdapter(pkg);
    restoredAdapter.restoreState(savedState);
    assert.deepEqual(restoredAdapter.exportState(), savedState);
  });
});
