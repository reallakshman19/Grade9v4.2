import {test} from 'node:test';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {source,paths,report} from './legacy_pilot_harness.spec.ts';
import {PortableWorkbenchAdapter} from '../../web/applications/portable/adapter.ts';
import {validatePortablePackage} from '../../web/applications/portable/validator.ts';
import type {PortableWorkbenchPackage} from '../../web/applications/portable/types.ts';
import {createApplicationHost} from '../../web/application-host/index.ts';
test('A69 actual native and target portable adapter: all four packages, exact rule decision, patch and restore',async()=>{
 const s=source();s.verifiedFile(paths.runtime);
 const native=await import(pathToFileURL(s.verifiedFile(paths.host)).href);
 let accepted=0,rejected=0;
 for(const path of [paths.motionPackage,paths.redoxPackage,paths.divisionPackage,paths.riemannPackage]){
  const pkg=JSON.parse(s.read(path).toString('utf8')) as PortableWorkbenchPackage;
  assert(validatePortablePackage(pkg).isValid,'target rejects pinned native package');
  const oracle=native.createDeclarativeAdapter(pkg),target=new PortableWorkbenchAdapter(pkg);
  for(const rule of pkg.adapter.rules){
   assert(rule.sourceEntityRef&&target.setActiveEntityId(rule.sourceEntityRef));
   const expected=oracle.evaluateTransfer({sourceEntityRef:rule.sourceEntityRef,targetRef:rule.targetRef,operation:rule.operation});
   const before=target.exportState(),observed=target.applyRule(rule.id);
   assert((observed.outcome==='ACCEPT')===expected.accepted,'native/target decision mismatch');
   if(expected.accepted){
    accepted++;for(const e of expected.patch?.addEntities??[])assert(target.getAllEntities().some(v=>JSON.stringify(v)===JSON.stringify(e)),'entity patch mismatch');
    for(const p of expected.patch?.addProjections??[])assert(target.getAllProjections().some(v=>JSON.stringify(v)===JSON.stringify(p)),'projection patch mismatch');
    const saved=target.exportState(),restored=new PortableWorkbenchAdapter(pkg);restored.restoreState(saved);assert.deepEqual(restored.exportState(),saved);
   }else{rejected++;assert.deepEqual(target.exportState(),before);}
  }
  const forged=structuredClone(pkg);(forged.adapter.rules[0] as any).outcome='UNKNOWN';assert(!validatePortablePackage(forged).isValid);
  for(const missing of ['patch','operation','transformationRef']){const bad=structuredClone(pkg);const r=bad.adapter.rules[0] as any;delete r.outcome;delete r[missing];assert(!validatePortablePackage(bad).isValid);}
 }
 assert(accepted===4&&rejected===1,'unexpected portable source scope');
 report('portable',{exactPackages:4,accepted,rejected,patchAndReplay:true,scope:'DECLARATIVE_RULES_ONLY'});
});
test('A69 target bridge rejects protected events; actual legacy pages remain non-routable',()=>{
 const origin='https://a69-isolated.example.invalid',host=createApplicationHost({appUrl:origin+'/private',expectedOrigin:origin});host.launch();
 const data={nonce:host.getNonce(),sessionId:host.getSessionId(),sequence:1};
 for(const type of ['APP_ANSWER_READ','APP_STORAGE_WRITE','APP_CREDENTIALS','APP_EVAL'])host.handleMessage({origin,data:{...data,type}});
 assert(host.getRejectionLog().length===4);assert(host.getRejectionLog().every(r=>r.reason==='PROTECTED_EVENT'));
 host.dismiss();
});
