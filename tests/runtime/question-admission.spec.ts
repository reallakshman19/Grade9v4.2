import {test} from 'node:test';
import assert from 'node:assert/strict';
import {projectQuestionAdmission} from '../../web/runtime/question-admission.ts';

test('source labels alone are not a reviewed academic release',()=>{
  const candidate={status:'RELEASED' as const,academicAdmission:'HOLD',keyState:'WITHHELD_CLIENT_SIDE_FAULT_N09' as const};
  assert.deepEqual(projectQuestionAdmission(candidate),{status:'HOLD',keyStatus:'UNVERIFIED'});
  assert.deepEqual(projectQuestionAdmission(candidate,true),{status:'HOLD',keyStatus:'UNVERIFIED'});
  assert.deepEqual(projectQuestionAdmission({...candidate,academicAdmission:'APPROVED',keyState:'VERIFIED'}),{status:'HOLD',keyStatus:'UNVERIFIED'});
  assert.deepEqual(projectQuestionAdmission({...candidate,academicAdmission:'APPROVED',keyState:'VERIFIED'},true),{status:'RELEASED',keyStatus:'VERIFIED'});
  assert.deepEqual(projectQuestionAdmission({...candidate,academicAdmission:'APPROVED'},true),{status:'RELEASED',keyStatus:'UNVERIFIED'});
  assert.deepEqual(projectQuestionAdmission({...candidate,status:'WITHDRAWN',academicAdmission:'APPROVED',keyState:'VERIFIED'},true),{status:'WITHDRAWN',keyStatus:'UNVERIFIED'});
});
