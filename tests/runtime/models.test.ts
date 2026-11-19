/**
 * tests/runtime/models.test.ts
 * A50 — Scientific interactive model registry runtime unit tests.
 *
 * Verifies:
 * - Pure adapter registry registration and lookup
 * - Energy well turning points, equilibrium, conservation (U + K = 12.5 J), and domain checks
 * - Execution parity across all 13 synthetic WPE oracle vectors
 * - Policy-filtered output disclosure ("no automatic output precommit")
 * - Safe purely analytical computation without eval()
 *
 * No academic approval inferred from software validation.
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import path from 'node:path';

import {
  HarmonicEnergyWellAdapter,
  calculateEnergyWell,
  ValueError,
} from '../../web/adapters/physics/models/energy-well.ts';
import {
  evaluateWpeModel,
} from '../../web/adapters/physics/models/wpe-oracles.ts';
import {
  ModelRegistry,
  getModelRegistry,
} from '../../web/runtime/models.ts';

describe('A50 Scientific Model Adapter: Harmonic Energy Well', () => {
  const adapter = new HarmonicEnergyWellAdapter();

  it('computes exact turning points at x = -0.5 and x = +0.5 where K = 0 and v = 0', () => {
    // Negative turning point
    const resNeg = adapter.evaluate({ x: -0.5 });
    assert.equal(resNeg['U'], 12.5);
    assert.equal(resNeg['K'], 0);
    assert.equal(resNeg['v'], 0);
    assert.equal(resNeg['isTurningPoint'], true);

    // Positive turning point
    const resPos = adapter.evaluate({ x: 0.5 });
    assert.equal(resPos['U'], 12.5);
    assert.equal(resPos['K'], 0);
    assert.equal(resPos['v'], 0);
    assert.equal(resPos['isTurningPoint'], true);
  });

  it('computes equilibrium state at x = 0.0 where U = 0 and v = 5.0 m/s', () => {
    const res = adapter.evaluate({ x: 0.0 });
    assert.equal(res['U'], 0);
    assert.equal(res['K'], 12.5);
    assert.equal(res['v'], 5.0);
    assert.equal(res['isTurningPoint'], false);
  });

  it('verifies mechanical energy conservation U + K = 12.5 across intermediate domain points', () => {
    for (const x of [-0.4, -0.25, -0.1, 0.1, 0.25, 0.4]) {
      const res = calculateEnergyWell(x);
      assert.ok(Math.abs(res.U + res.K - 12.5) < 1e-10);
      assert.ok(Math.abs(0.5 * res.v * res.v - res.K) < 1e-10);
    }
  });

  it('strictly rejects parameter domain violations outside [-0.5, 0.5] and non-finites', () => {
    const invalidValues = [-0.51, 0.51, 1.0, -10, NaN, Infinity, -Infinity];

    for (const badX of invalidValues) {
      assert.equal(adapter.validate({ x: badX }).isValid, false);
      assert.throws(() => adapter.evaluate({ x: badX }), ValueError);
    }
  });
});

describe('A50 Thirteen Synthetic WPE Model Oracles Parity', () => {
  it('correctly computes all 13 synthetic model families', () => {
    // Path to R4 acceptance fixtures
    const fixturePath = 'fixtures/synthetic/r4-wpe-model-cases.json';
    if (!fs.existsSync(fixturePath)) {
      // Fallback relative path
      assert.fail(`Fixture file missing at ${fixturePath}`);
    }

    const raw = fs.readFileSync(fixturePath);
    const bytes = Buffer.from(raw.toString('utf8').replace(/\r\n/g, '\n'), 'utf8');
    assert.equal(createHash('sha256').update(bytes).digest('hex'), '1813b4497b98d5a9198ec0cc77f294ab7207abe7880981abad6e144bf90c6b4d');
    const cases = JSON.parse(bytes.toString('utf8'));
    assert.equal(cases.length, 13);

    for (const c of cases) {
      const family = c.family;
      const inputs = c.inputs;
      const expected = c.expected;

      const actual = evaluateWpeModel(family, inputs);

      for (const [key, expVal] of Object.entries(expected)) {
        const actVal = actual[key];

        if (typeof expVal === 'number') {
          assert.ok(
            Math.abs(actVal - expVal) < 1e-6,
            `Model ${c.id} (${family}) key "${key}": expected ${expVal}, got ${actVal}`
          );
        } else if (Array.isArray(expVal)) {
          assert.equal(
            actVal.length,
            expVal.length,
            `Model ${c.id} (${family}) array length mismatch on "${key}"`
          );
          for (let i = 0; i < expVal.length; i++) {
            if (typeof expVal[i] === 'number') {
              assert.ok(Math.abs(actVal[i] - expVal[i]) < 1e-6);
            } else {
              assert.equal(actVal[i], expVal[i]);
            }
          }
        } else {
          assert.equal(
            actVal,
            expVal,
            `Model ${c.id} (${family}) mismatch on "${key}"`
          );
        }
      }
    }
  });
});

describe('A50 Model Registry & Policy-Filtered Disclosure', () => {
  it('registers defaults and retrieves models by ID and family', () => {
    const registry = new ModelRegistry();
    const all = registry.getAll();
    assert.ok(all.length >= 14); // 1 energy well + 13 WPE families

    const well = registry.get('PHYS-MODEL-ENERGY-WELL');
    assert.ok(well);
    assert.equal(well.family, 'POTENTIAL_WELLS');

    const ledger = registry.getByFamily('MULTIFORCE_LEDGER');
    assert.ok(ledger);
  });

  it('enforces pre-commit output masking during PREDICT and ATTEMPT stages', () => {
    const registry = getModelRegistry();

    // 1. In PREDICT stage without permission -> outputs MASKED
    const resPredict = registry.evaluateWithPolicy(
      'PHYS-MODEL-ENERGY-WELL',
      { x: 0.2 },
      'PREDICT',
      []
    );
    assert.equal(resPredict.isMasked, true);
    assert.equal(resPredict.outputs, null);
    assert.match(resPredict.reason || '', /withheld/i);

    // 2. In ATTEMPT stage without permission -> outputs MASKED
    const resAttempt = registry.evaluateWithPolicy(
      'PHYS-MODEL-ENERGY-WELL',
      { x: 0.2 },
      'ATTEMPT',
      []
    );
    assert.equal(resAttempt.isMasked, true);
    assert.equal(resAttempt.outputs, null);

    // 3. In ATTEMPT stage with MODEL_AUTO_CALCULATE capability -> outputs REVEALED
    const resAttemptAllowed = registry.evaluateWithPolicy(
      'PHYS-MODEL-ENERGY-WELL',
      { x: 0.2 },
      'ATTEMPT',
      ['MODEL_AUTO_CALCULATE']
    );
    assert.equal(resAttemptAllowed.isMasked,true);assert.equal(resAttemptAllowed.outputs,null);

    // 4. In RECONSTRUCT stage -> outputs REVEALED
    const resReconstruct = registry.evaluateWithPolicy(
      'PHYS-MODEL-ENERGY-WELL',
      { x: 0.2 },
      'RECONSTRUCT',
      []
    );
    assert.equal(resReconstruct.isMasked,true);assert.equal(resReconstruct.outputs,null);assert.ok(Math.abs(registry.evaluateDiagnostic('PHYS-MODEL-ENERGY-WELL',{x:.2}).U-2)<1e-12);
  });

  it('guarantees zero eval() or dynamic code evaluation in registry and models', () => {
    const modelFiles = [
      path.resolve('web/runtime/models.ts'),
      path.resolve('web/adapters/physics/models/energy-well.ts'),
      path.resolve('web/adapters/physics/models/wpe-oracles.ts'),
    ];

    for (const f of modelFiles) {
      const content = fs.readFileSync(f, 'utf-8');
      // Strip comments before checking for executable eval calls
      const stripped = content.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '');
      assert.ok(!/\beval\s*\(/.test(stripped), `File ${f} contains forbidden eval()`);
      assert.ok(!/\bFunction\s*\(/.test(stripped), `File ${f} contains forbidden Function() constructor`);
    }
  });
});

it('rejects invalid oracle regimes, vector truncation and duplicate registry identity',()=>{for(const [family,p] of [['INSTANTANEOUS_POWER',{force:[1,2],velocity:[1]}],['SPRING_CONTACT',{k:1,x:1,m:1,friction:0,distance:1}],['DISSIPATIVE_BOUNCES',{mass:1,impact_speed:1,restitution:2}],['CONSTANT_POWER',{mass:0,initial_speed:1,power:1,time:1}] ] as const)assert.throws(()=>evaluateWpeModel(family,p));const r=new ModelRegistry();assert.equal(r.getByFamily('POTENTIAL_WELLS')?.id,'PHYS-MODEL-ENERGY-WELL');assert.throws(()=>r.register(new HarmonicEnergyWellAdapter()));});

import {MemoryStorageDriver} from '../../web/runtime/storage.ts';
import {DefaultCognitiveStore} from '../../web/runtime/cognitive-store.ts';
import {CognitiveController} from '../../web/journeys/cognitive-controller.ts';
import {sameRef} from '../../web/runtime/loader.ts';
import type {TaskRef,Ref,Session,JourneyKey,CognitiveEvent,Checkpoint} from '../../web/runtime/types.ts';
it('A50 actual A49 durable exposure is required, exact model asset and stale checkpoint denied',async()=>{
 const driver=new MemoryStorageDriver(),task:TaskRef={type:'QUESTION',id:'que:model:synthetic',revision:1,sha256:'a'.repeat(64)},boundary:TaskRef={...task,type:'FRESH_TASK',id:'que:model:boundary'},asset:Ref={type:'ASSET',id:'PHYS-MODEL-ENERGY-WELL',revision:1,sha256:'b'.repeat(64)};
 const firstReference:Ref={...task,type:'SOLUTION',id:'sol:model:first'},boundaryReference:Ref={...task,type:'SOLUTION',id:'sol:model:boundary'};
 const releaseId='rel:model:synthetic',journey:JourneyKey={journeyId:'journey:model',taskInstanceId:'inst:model',task,releaseId};
 const session:Session={id:'ses:model',item:task,releaseId,mode:'PRACTICE',contentRevision:'r1',origin:null,returnRoute:null,cursor:0,attemptIds:[],draftId:null};
 await driver.put('sessions',session.id,session);
 const authority={liveRevision:async()=> 'r1',reviewedContext:async()=>({releaseId,task,boundaryTask:boundary,firstReference,boundaryReference,firstFields:{a:'INTEGER' as const},boundaryFields:{a:'INTEGER' as const},moves:['m']}),allowed:async(_j:any,_s:any,cap:string,a:Ref)=>cap==='MODEL_AUTO_CALCULATE'&&sameRef(a,asset),boundaryAllowed:async()=>false};
 const controller=new CognitiveController({journey,sessionId:session.id},new DefaultCognitiveStore(driver),driver,authority);
 let snap=await controller.begin();
 const event=(cp:Checkpoint,type:CognitiveEvent['event_type'],payload:any):CognitiveEvent=>({schema_version:'g9-cognitive-event/2',event_id:'evt:model:'+String(cp.sequence+1),journey_id:journey.journeyId,task_instance_id:journey.taskInstanceId,release_id:releaseId,task_ref:task,sequence:cp.sequence+1,previous_sha256:cp.sha256,at:'2026-11-18T09:00:00Z',event_type:type,payload} as CognitiveEvent);
 const registry=new ModelRegistry(),binding={controller,asset,checkpoint:snap.checkpoint,exposureId:'evt:model:2',modelId:asset.id};
 assert((await registry.evaluateAuthorized(asset.id,{x:.2},binding)).isMasked);
 snap=await controller.commit(event(snap.checkpoint,'PREDICTION_COMMITTED',{prediction:'UNSURE',artifact_ids:[]}),snap.checkpoint,[]);
 const h=event(snap.checkpoint,'HELP_EXPOSED',{capability:'MODEL_AUTO_CALCULATE',asset_ref:asset,ordinal:1});
 const stale=snap.checkpoint;assert((await registry.evaluateAuthorized(asset.id,{x:.2},{...binding,checkpoint:stale})).isMasked);
 snap=await controller.commit(h,snap.checkpoint,[]);
 const valid={...binding,checkpoint:snap.checkpoint};
 const value=await registry.evaluateAuthorized(asset.id,{x:.2},valid);assert.equal(value.isMasked,false);assert.ok(Math.abs(value.outputs!.U-2)<1e-12);
 assert((await registry.evaluateAuthorized(asset.id,{x:.2},{...valid,checkpoint:stale})).isMasked);
 assert((await registry.evaluateAuthorized(asset.id,{x:.2},{...valid,asset:{...asset,sha256:'c'.repeat(64)}})).isMasked);
 await driver.put('sessions',session.id,{...session,mode:'SIMULATED_EXAM',deadlineAt:'2099-01-01T00:00:00Z'});assert((await registry.evaluateAuthorized(asset.id,{x:.2},valid)).isMasked);
});

