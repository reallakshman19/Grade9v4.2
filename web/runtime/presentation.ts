// Wave 9 corrected-main adapter. No caller-provided stage, commitment or source hash is authority.
// Trust composition follows A49: only the release bootstrap supplies the controller and asset loader.
import {ManifestLoader,sameRef,canonicalJson} from './loader.ts';
import type {ReleaseManifest} from './loader.ts';
import {findDuplicateKeyInJson} from './response.ts';
import {refOk} from './progress.ts';
import type {Checkpoint,Ref,TaskRef} from './types.ts';
import {CognitiveController} from '../journeys/cognitive-controller.ts';
export {computeSha256} from './loader.ts';
export type SupportedLocale='en-US'|'hi-IN';
export type PresentationLevel='INTUITION'|'MODEL'|'FORMAL';
export type AssetLoader=(ref:Ref)=>Promise<Uint8Array>;
export const nonblank=(x:unknown):x is string=>typeof x==='string'&&x.trim().length>0&&x.length<=100000;
export const exactKeys=(x:unknown,keys:readonly string[]):x is Record<string,unknown>=>!!x&&typeof x==='object'&&!Array.isArray(x)&&Object.keys(x).sort().join(',')===[...keys].sort().join(',');
export function strictObject(text:string):unknown{
 if(findDuplicateKeyInJson(text))throw Error('DUPLICATE_PROJECTION_KEY');
 return JSON.parse(text);
}
export function diagnosticStem(loader:ManifestLoader,manifest:ReleaseManifest,ref:TaskRef,releaseId:string){
 if(!refOk(ref)||!['QUESTION','FRESH_TASK'].includes(ref.type))throw Error('INVALID_SOURCE_REF');
 const item=loader.resolveItem<{stem:string}>(manifest,ref,'PRECOMMIT',releaseId);
 return Object.freeze({stem:item.stem,source:structuredClone(ref),releaseId,academicAdmission:'HOLD' as const,learnerRelease:false as const});
}
export interface PresentationProjection {
 readonly source:TaskRef;readonly locale:SupportedLocale;readonly level:PresentationLevel;
 readonly text:string;readonly symbolsAndUnits:Readonly<Record<string,string>>;
}
export class ProgressivePresentationController {
 readonly #controller:CognitiveController;readonly #load:AssetLoader;
 constructor(controller:CognitiveController,load:AssetLoader){this.#controller=controller;this.#load=load;}
 async read(asset:Ref<'PRESENTATION'>,locale:SupportedLocale,level:PresentationLevel,checkpoint:Checkpoint):Promise<PresentationProjection|null>{
  if(!refOk(asset)||asset.type!=='PRESENTATION'||!['en-US','hi-IN'].includes(locale)||!['INTUITION','MODEL','FORMAL'].includes(level))return null;
  const ref=structuredClone(asset),cp=structuredClone(checkpoint);
  try{
   const before=await this.#controller.readEvidence(cp);
   const raw=await this.#controller.readProtectedText('VIEW_STIMULUS',ref,cp,this.#load);
   if(raw===null)return null;
   const obj=strictObject(raw);
   if(!exactKeys(obj,['source','locale','level','text','symbolsAndUnits'])||!refOk(obj.source)||!sameRef(obj.source as Ref,before.context.task)||obj.locale!==locale||obj.level!==level||!nonblank(obj.text))return null;
   const units=obj.symbolsAndUnits;
   if(!units||typeof units!=='object'||Array.isArray(units)||!Object.entries(units).every(([k,v])=>nonblank(k)&&nonblank(v)))return null;
   // This is a reviewed asset, not an independent proof of scientific meaning.
   // The provider must only authorize exact qualified locale/tier projections; no fallbacks.
   const after=await this.#controller.readEvidence(cp);
   if(after.session.id!==before.session.id||!sameRef(after.context.task,before.context.task)||canonicalJson(after.snapshot.checkpoint)!==canonicalJson(cp)||!await this.#controller.canDisplay('VIEW_STIMULUS',ref,cp))return null;
   return structuredClone(obj) as unknown as PresentationProjection;
  }catch{return null;}
 }
}
export class StageGatedFeedbackController {
 readonly #controller:CognitiveController;readonly #load:AssetLoader;
 constructor(controller:CognitiveController,load:AssetLoader){this.#controller=controller;this.#load=load;}
 async readFirstReference(checkpoint:Checkpoint):Promise<string|null>{
  try{const cp=structuredClone(checkpoint),e=await this.#controller.readEvidence(cp);return this.#controller.readProtectedText('REFERENCE_SOLUTION',e.context.firstReference,cp,this.#load);}catch{return null;}
 }
 async readBoundaryReference(checkpoint:Checkpoint):Promise<string|null>{
  try{const cp=structuredClone(checkpoint),e=await this.#controller.readEvidence(cp);return this.#controller.readProtectedText('BOUNDARY_REFERENCE',e.context.boundaryReference,cp,this.#load);}catch{return null;}
 }
 // W requires a separately reviewed warrant/disclosure capability; A49 does not provide one.
 // Do not infer authority or synthesize a warrant from a solution or boundary commit.
}
