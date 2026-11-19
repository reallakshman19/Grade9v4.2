// A49 R2: reviewed policy is separate from intrinsic A48 evidence validation.
import type {CognitiveSnapshot,SessionMode,DisclosureCapability} from './types.ts';
export type HintLevel='H1'|'H2'|'H3';
export const HINT_ORDER:readonly HintLevel[]=['H1','H2','H3'];
export function permittedStage(s:CognitiveSnapshot,mode:SessionMode,cap:DisclosureCapability):boolean{
  if(mode==='SIMULATED_EXAM')return cap==='VIEW_STIMULUS'||cap==='EDIT_WORK';
  switch(cap){
    case 'VIEW_STIMULUS':return true;
    case 'EDIT_WORK':return s.stage!=='COMPLETE';
    case 'H1':case 'H2':case 'H3':case 'READ_ANCHOR':case 'MODEL_AUTO_CALCULATE':case 'MODEL_MANIPULATE':return s.stage==='ATTEMPT';
    case 'REFERENCE_SOLUTION':case 'SHOW_REASONING_CRUX':return !!s.firstAttemptId&&['RECONSTRUCT','DIAGNOSE','REPAIR','BOUNDARY_TEST','COMPLETE'].includes(s.stage);
    case 'BOUNDARY_REFERENCE':return !!s.boundaryAttemptId&&['BOUNDARY_TEST','COMPLETE'].includes(s.stage);
    case 'SOURCE_RETURN':return s.stage==='COMPLETE'&&!!s.boundaryAttemptId;
    default:return false;
  }
}
