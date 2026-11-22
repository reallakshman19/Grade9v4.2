import type {UnifiedQuestionEntry} from './unified-question-database.ts';
import type {KeyEvaluationStatus} from '../components/response/types.ts';

/** Diagnostic source records are not automatically academically publishable.
 * A verified release receipt must be separately provided by the trusted
 * release/bootstrap boundary. A self-declared corpus flag is not authority.
 */
export function projectQuestionAdmission(
  source:Pick<UnifiedQuestionEntry,'status'|'academicAdmission'|'keyState'>,
  verifiedReleaseReceipt=false
):{status:'RELEASED'|'WITHDRAWN'|'HOLD';keyStatus:KeyEvaluationStatus}{
  if(source.status==='WITHDRAWN')return {status:'WITHDRAWN',keyStatus:'UNVERIFIED'};
  if(!verifiedReleaseReceipt||source.status!=='RELEASED'||source.academicAdmission!=='APPROVED'){
    return {status:'HOLD',keyStatus:'UNVERIFIED'};
  }
  return {
    status:'RELEASED',
    keyStatus:source.keyState==='VERIFIED'?'VERIFIED':'UNVERIFIED'
  };
}
