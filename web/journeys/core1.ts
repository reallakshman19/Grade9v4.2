// A66: reviewed native map reader. No self-declared print receipt or arbitrary /learn link.
import {sameRef} from '../runtime/loader.ts';
import {refOk} from '../runtime/progress.ts';
import {exactKeys,nonblank,strictObject,type AssetLoader} from '../runtime/presentation.ts';
import type {Checkpoint,Ref} from '../runtime/types.ts';
import {CognitiveController} from './cognitive-controller.ts';
export const CORE1_ORIENTATION_BLUEPRINT_ID='BP-CORE1-ORIENTATION@1.1.0';
export const CORE1_ORIENTATION_BLOCKS=['identity_scope','learner_metadata','objects_conventions','canonical_representation','governing_relations','compact_anchor','hard_transition_map','exclusions_extensions','orientation_closure'] as const;
export type OrientationBlock=typeof CORE1_ORIENTATION_BLOCKS[number];
export interface Core1OrientationProjection{
 readonly blueprint:typeof CORE1_ORIENTATION_BLUEPRINT_ID;readonly source:Ref;readonly topicId:string;
 readonly blocks:Readonly<Record<OrientationBlock,string>>;
}
// Structural completeness is necessary, never semantic completeness. A57/A61 review must
// bind actual native coverage, closures and convention meanings before authorizing the asset.
export function parseOrientation(raw:string,source:Ref):Core1OrientationProjection|null{
 try{
  const p=strictObject(raw);
  if(!exactKeys(p,['blueprint','source','topicId','blocks'])||p.blueprint!==CORE1_ORIENTATION_BLUEPRINT_ID||!refOk(p.source)||!sameRef(p.source as Ref,source)||!nonblank(p.topicId)||!exactKeys(p.blocks,CORE1_ORIENTATION_BLOCKS)||!Object.values(p.blocks).every(nonblank))return null;
  return structuredClone(p) as unknown as Core1OrientationProjection;
 }catch{return null;}
}
export class Core1OrientationJourney{
 readonly #controller:CognitiveController;readonly #load:AssetLoader;
 constructor(controller:CognitiveController,load:AssetLoader){this.#controller=controller;this.#load=load;}
 async read(asset:Ref<'PRESENTATION'>,checkpoint:Checkpoint):Promise<Core1OrientationProjection|null>{
  if(!refOk(asset)||asset.type!=='PRESENTATION')return null;
  try{
   const ref=structuredClone(asset),cp=structuredClone(checkpoint),e=await this.#controller.readEvidence(cp);
   const raw=await this.#controller.readProtectedText('VIEW_STIMULUS',ref,cp,this.#load);
   if(raw===null||!await this.#controller.canDisplay('VIEW_STIMULUS',ref,cp))return null;
   return parseOrientation(raw,e.context.task);
  }catch{return null;}
 }
 // No verified native registry route/print provider exists on main. No string-derived route,
 // no print-receipt truthiness, no implicit generic print. These functions fail closed.
 canPrintPDF():false{return false;}
 getLessonRoute():null{return null;}
}
