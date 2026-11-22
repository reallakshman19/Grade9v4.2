import {test} from 'node:test';
import assert from 'node:assert/strict';
import {legacyPage,paths,measure,report} from './legacy_pilot_harness.spec.ts';
test('A69 pinned native motion: live controls, projectile telemetry, complementary range and banking',{timeout:60000},async()=>{
 const h=await legacyPage(paths.motion);try{
  const p=h.page,read=async(id:string)=>Number.parseFloat(await p.locator('#'+id).innerText());
  const set=async(id:string,value:number)=>{await p.locator('#'+id).evaluate((n,v)=>{const el=n as HTMLInputElement;el.value=String(v);el.dispatchEvent(new Event('input',{bubbles:true}));},value);};
  const near=(a:number,b:number,t=.011)=>assert(Number.isFinite(a)&&Math.abs(a-b)<t,'native numerical mismatch');
  let checks=0;
  for(const [u,theta,g] of [[20,30,9.8],[32,55,10],[12,75,5.2]]){
   await set('sliderU',u);await set('sliderTheta',theta);await set('sliderG',g);
   const a=theta*Math.PI/180,ux=u*Math.cos(a),uy=u*Math.sin(a);
   near(await read('telemT'),2*uy/g);near(await read('telemH'),uy*uy/(2*g));near(await read('telemR'),2*ux*uy/g);near(await read('telemUx'),ux);checks+=4;
   const range=await read('telemR');await p.locator('#projCompBtn').click();near(await read('telemR'),range);checks++;
  }
  await p.locator('#projLaunchBtn').click();await p.locator('#projResetBtn').click();
  await p.locator('[data-tab=tab-banking]').click();await set('sliderBankAngle',30);await set('sliderRadius',60);
  near(await read('telemOptSpeed'),Math.sqrt(60*9.8*Math.tan(Math.PI/6)),.051);checks++;
  const layout=await measure(p,'button,input,select');report('motion',{nativeChecks:checks,layout,source:'EXACT_GIT_BYTES',targetTrajectory:'NOT_IMPLEMENTED',energyStream:'NOT_OBSERVED',legacyApplicationParity:'HOLD'});
 }finally{await h.close();}
});
