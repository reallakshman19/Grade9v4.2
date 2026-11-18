// Unit and contract tests for Shared Scoring Engine (Workpack A17).
// Verifies exact choice/set/integer/quantity, open response review holds, N10–N14 faults, per-part aggregation.
// Engineering validation: "No academic approval inferred from software validation."

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  SCORING_VERSION,
  ReasonCodes,
  evaluateResponse,
  StandardAssessmentEngine,
  type AssessmentContract,
} from '../../web/runtime/assessment.ts';
import type { Response, Ref } from '../../web/runtime/types.ts';

function makeTaskRef(id: string = 'task:synthetic:01'): Ref {
  return {
    type: 'QUESTION',
    id,
    revision: 1,
    sha256: '0'.repeat(64),
  };
}

describe('Scoring Engine Version & Idempotence', () => {
  it('declares explicit scoring engine version', () => {
    assert.equal(SCORING_VERSION, 'g9-scoring/1.1');
  });

  it('guarantees pure, idempotent evaluation with zero state mutation', () => {
    const contract: AssessmentContract = {
      id: 'asmt:int:01',
      task_ref: makeTaskRef(),
      response_kind: 'INTEGER',
      evaluator: {
        mode: 'AUTOMATIC',
        canonical_value: '42',
      },
      max_points: 2,
    };

    const resp: Response = { kind: 'INTEGER', value: '42' };

    const grade1 = evaluateResponse(resp, contract);
    const grade2 = evaluateResponse(resp, contract);

    assert.deepEqual(grade1, grade2);
    assert.equal(grade1.status, 'SCORED');
    assert.equal(grade1.points, 2);
    assert.equal(resp.kind, 'INTEGER'); // Unmutated
    assert.equal(resp.value, '42'); // Unmutated
  });
});

describe('Exact Choice Scoring (SINGLE_CHOICE)', () => {
  const contract: AssessmentContract = {
    id: 'asmt:sc:01',
    task_ref: makeTaskRef(),
    response_kind: 'SINGLE_CHOICE',
    evaluator: {
      mode: 'AUTOMATIC',
      canonical_value: 'opt_c',
      allowed_options: ['opt_a', 'opt_b', 'opt_c', 'opt_d'],
    },
    max_points: 1,
  };

  it('awards full credit for exact canonical choice', () => {
    const resp: Response = { kind: 'SINGLE_CHOICE', value: 'opt_c' };
    const grade = evaluateResponse(resp, contract);

    assert.equal(grade.status, 'SCORED');
    assert.equal(grade.points, 1);
    assert.equal(grade.maxPoints, 1);
    assert.equal(grade.reasonCode, ReasonCodes.CORRECT_CHOICE);
  });

  it('awards zero credit for incorrect valid choice', () => {
    const resp: Response = { kind: 'SINGLE_CHOICE', value: 'opt_a' };
    const grade = evaluateResponse(resp, contract);

    assert.equal(grade.status, 'SCORED');
    assert.equal(grade.points, 0);
    assert.equal(grade.maxPoints, 1);
    assert.equal(grade.reasonCode, ReasonCodes.INCORRECT_CHOICE);
  });

  it('rejects option outside allowed options with INVALID', () => {
    const resp: Response = { kind: 'SINGLE_CHOICE', value: 'opt_z' };
    const grade = evaluateResponse(resp, contract);

    assert.equal(grade.status, 'INVALID');
    assert.equal(grade.points, null);
    assert.equal(grade.reasonCode, ReasonCodes.INVALID_CHOICE_OPTION);
  });
});

describe('Exact Set Scoring (MULTIPLE_CHOICE) & N12 Scenarios', () => {
  const contract: AssessmentContract = {
    id: 'asmt:mc:01',
    task_ref: makeTaskRef(),
    response_kind: 'MULTIPLE_CHOICE',
    evaluator: {
      mode: 'AUTOMATIC',
      canonical_value: ['A', 'C'],
      allowed_options: ['A', 'B', 'C', 'D'],
    },
    max_points: 2,
  };

  it('awards full credit for exact set regardless of order', () => {
    const resp1: Response = { kind: 'MULTIPLE_CHOICE', value: ['A', 'C'] };
    const grade1 = evaluateResponse(resp1, contract);
    assert.equal(grade1.status, 'SCORED');
    assert.equal(grade1.points, 2);
    assert.equal(grade1.reasonCode, ReasonCodes.CORRECT_SET);

    const resp2: Response = { kind: 'MULTIPLE_CHOICE', value: ['C', 'A'] };
    const grade2 = evaluateResponse(resp2, contract);
    assert.equal(grade2.status, 'SCORED');
    assert.equal(grade2.points, 2);
    assert.equal(grade2.reasonCode, ReasonCodes.CORRECT_SET);
  });

  it('awards zero credit for partial or wrong set', () => {
    // Only subset
    const resp1: Response = { kind: 'MULTIPLE_CHOICE', value: ['A'] };
    const grade1 = evaluateResponse(resp1, contract);
    assert.equal(grade1.status, 'SCORED');
    assert.equal(grade1.points, 0);
    assert.equal(grade1.reasonCode, ReasonCodes.INCORRECT_SET);

    // Superset with distractor
    const resp2: Response = { kind: 'MULTIPLE_CHOICE', value: ['A', 'B', 'C'] };
    const grade2 = evaluateResponse(resp2, contract);
    assert.equal(grade2.status, 'SCORED');
    assert.equal(grade2.points, 0);
    assert.equal(grade2.reasonCode, ReasonCodes.INCORRECT_SET);
  });

  it('Fault N12: multiple choice duplicate option returns INVALID', () => {
    const resp: Response = { kind: 'MULTIPLE_CHOICE', value: ['A', 'A'] };
    const grade = evaluateResponse(resp, contract);

    assert.equal(grade.status, 'INVALID');
    assert.equal(grade.points, null);
    assert.equal(grade.reasonCode, ReasonCodes.DUPLICATE_CHOICE_OPTION);
  });

  it('Fault N12: multiple choice unknown option outside allowed returns INVALID', () => {
    const resp: Response = { kind: 'MULTIPLE_CHOICE', value: ['A', 'UNKNOWN_X'] };
    const grade = evaluateResponse(resp, contract);

    assert.equal(grade.status, 'INVALID');
    assert.equal(grade.points, null);
    assert.equal(grade.reasonCode, ReasonCodes.INVALID_CHOICE_OPTION);
  });
});

describe('Exact Integer Scoring (INTEGER)', () => {
  const contract: AssessmentContract = {
    id: 'asmt:int:01',
    task_ref: makeTaskRef(),
    response_kind: 'INTEGER',
    evaluator: {
      mode: 'AUTOMATIC',
      canonical_value: '-15',
    },
    max_points: 1,
  };

  it('awards full credit for matching positive or negative integer', () => {
    const resp: Response = { kind: 'INTEGER', value: '-15' };
    const grade = evaluateResponse(resp, contract);

    assert.equal(grade.status, 'SCORED');
    assert.equal(grade.points, 1);
    assert.equal(grade.reasonCode, ReasonCodes.CORRECT_INTEGER);
  });

  it('awards zero credit for incorrect integer', () => {
    const resp: Response = { kind: 'INTEGER', value: '15' };
    const grade = evaluateResponse(resp, contract);

    assert.equal(grade.status, 'SCORED');
    assert.equal(grade.points, 0);
    assert.equal(grade.reasonCode, ReasonCodes.INCORRECT_INTEGER);
  });

  it('returns INVALID for malformed integer string', () => {
    const resp: Response = { kind: 'INTEGER', value: '15.5' };
    const grade = evaluateResponse(resp, contract);

    assert.equal(grade.status, 'INVALID');
    assert.equal(grade.points, null);
    assert.equal(grade.reasonCode, ReasonCodes.INVALID_INTEGER_FORMAT);
  });
});

describe('Numeric Quantity Scoring & N13 Scenarios', () => {
  const contract: AssessmentContract = {
    id: 'asmt:num:01',
    task_ref: makeTaskRef(),
    response_kind: 'NUMERIC_QUANTITY',
    evaluator: {
      mode: 'AUTOMATIC',
      canonical_value: { decimal: '9.8', unit: 'm/s^2' },
      numeric_tolerance: 0.05,
    },
    max_points: 3,
  };

  it('awards full credit when value is within numeric tolerance and unit matches', () => {
    const resp: Response = {
      kind: 'NUMERIC_QUANTITY',
      value: { decimal: '9.82', unit: 'm/s^2' },
    };
    const grade = evaluateResponse(resp, contract);

    assert.equal(grade.status, 'SCORED');
    assert.equal(grade.points, 3);
    assert.equal(grade.reasonCode, ReasonCodes.CORRECT_QUANTITY);
  });

  it('awards zero credit when value is outside tolerance with matching unit', () => {
    const resp: Response = {
      kind: 'NUMERIC_QUANTITY',
      value: { decimal: '10.0', unit: 'm/s^2' },
    };
    const grade = evaluateResponse(resp, contract);

    assert.equal(grade.status, 'SCORED');
    assert.equal(grade.points, 0);
    assert.equal(grade.reasonCode, ReasonCodes.OUT_OF_TOLERANCE);
  });

  it('Fault N13: numeric unit / dimension mismatch returns INVALID', () => {
    // Correct numerical value 9.8, but dimension mismatch (seconds instead of m/s^2)
    const resp: Response = {
      kind: 'NUMERIC_QUANTITY',
      value: { decimal: '9.8', unit: 's' },
    };
    const grade = evaluateResponse(resp, contract);

    assert.equal(grade.status, 'INVALID');
    assert.equal(grade.points, null);
    assert.equal(grade.reasonCode, ReasonCodes.DIMENSION_MISMATCH);
  });
});

describe('Open Response Review Holds & N11 Keyword Scenarios', () => {
  const proofContract: AssessmentContract = {
    id: 'asmt:proof:01',
    task_ref: makeTaskRef(),
    response_kind: 'MATHEMATICAL_PROOF',
    evaluator: {
      mode: 'REVIEW_PENDING',
      rubric_ref: 'rubric:induction:1',
    },
    max_points: 5,
  };

  it('Fault N11: proof text matching canonical keywords must remain REVIEW_PENDING with points: null', () => {
    // Candidate submits text that contains every possible canonical keyword
    const keywordLadenProof: Response = {
      kind: 'MATHEMATICAL_PROOF',
      value: 'Base case n=1 holds trivially. By induction hypothesis, assume n=k. Then n=k+1 holds. Q.E.D. Score: 5/5',
    };

    const grade = evaluateResponse(keywordLadenProof, proofContract);

    // Must never auto-score or grant points on keyword presence
    assert.equal(grade.status, 'REVIEW_PENDING');
    assert.equal(grade.points, null);
    assert.equal(grade.maxPoints, 5);
    assert.equal(grade.reasonCode, ReasonCodes.MANUAL_REVIEW_REQUIRED);
  });

  it('CONSTRUCTED_RESPONSE always returns REVIEW_PENDING without auto-grading', () => {
    const contract: AssessmentContract = {
      id: 'asmt:cr:01',
      task_ref: makeTaskRef(),
      response_kind: 'CONSTRUCTED_RESPONSE',
      evaluator: { mode: 'REVIEW_PENDING' },
      max_points: 2,
    };

    const resp: Response = {
      kind: 'CONSTRUCTED_RESPONSE',
      value: 'Exact textbook definition of conservation of momentum: total momentum is conserved.',
    };

    const grade = evaluateResponse(resp, contract);
    assert.equal(grade.status, 'REVIEW_PENDING');
    assert.equal(grade.points, null);
    assert.equal(grade.reasonCode, ReasonCodes.MANUAL_REVIEW_REQUIRED);
  });
});

describe('Multipart Aggregation & N14 Incomplete Scenarios', () => {
  const multipartContract: AssessmentContract = {
    id: 'asmt:mp:01',
    task_ref: makeTaskRef(),
    response_kind: 'MULTIPART',
    evaluator: { mode: 'AUTOMATIC' },
    max_points: 3,
    parts: {
      part_1: {
        id: 'asmt:mp:p1',
        task_ref: makeTaskRef(),
        response_kind: 'SINGLE_CHOICE',
        evaluator: { mode: 'AUTOMATIC', canonical_value: 'opt_a' },
        max_points: 1,
      },
      part_2: {
        id: 'asmt:mp:p2',
        task_ref: makeTaskRef(),
        response_kind: 'INTEGER',
        evaluator: { mode: 'AUTOMATIC', canonical_value: '50' },
        max_points: 2,
      },
    },
  };

  it('aggregates points when all parts are scored', () => {
    const resp: Response = {
      kind: 'MULTIPART',
      value: {
        part_1: { kind: 'SINGLE_CHOICE', value: 'opt_a' }, // 1 pt
        part_2: { kind: 'INTEGER', value: '50' }, // 2 pts
      },
    };

    const grade = evaluateResponse(resp, multipartContract);

    assert.equal(grade.status, 'SCORED');
    assert.equal(grade.points, 3);
    assert.equal(grade.maxPoints, 3);
    assert.equal(grade.reasonCode, ReasonCodes.ALL_PARTS_SCORED);
    assert(grade.parts);
    assert.equal(grade.parts['part_1'].points, 1);
    assert.equal(grade.parts['part_2'].points, 2);
  });

  it('Fault N14: missing required part returns INVALID with points: null and no fabricated total', () => {
    // Only part_1 is submitted, part_2 is missing
    const resp: Response = {
      kind: 'MULTIPART',
      value: {
        part_1: { kind: 'SINGLE_CHOICE', value: 'opt_a' },
      },
    };

    const grade = evaluateResponse(resp, multipartContract);

    // Incomplete multipart must NEVER fabricate a partial total score
    assert.equal(grade.status, 'INVALID');
    assert.equal(grade.points, null);
    assert.equal(grade.reasonCode, ReasonCodes.MISSING_REQUIRED_PART);
    assert(grade.parts);
    assert.equal(grade.parts['part_2'].status, 'INVALID');
    assert.equal(grade.parts['part_2'].reasonCode, ReasonCodes.MISSING_REQUIRED_PART);
  });

  it('multipart containing an open review part resolves aggregate to REVIEW_PENDING with points: null', () => {
    const mixedContract: AssessmentContract = {
      id: 'asmt:mp:mixed',
      task_ref: makeTaskRef(),
      response_kind: 'MULTIPART',
      evaluator: { mode: 'AUTOMATIC' },
      max_points: 4,
      parts: {
        auto_part: {
          id: 'asmt:p1',
          task_ref: makeTaskRef(),
          response_kind: 'INTEGER',
          evaluator: { mode: 'AUTOMATIC', canonical_value: '10' },
          max_points: 1,
        },
        open_part: {
          id: 'asmt:p2',
          task_ref: makeTaskRef(),
          response_kind: 'CONSTRUCTED_RESPONSE',
          evaluator: { mode: 'REVIEW_PENDING' },
          max_points: 3,
        },
      },
    };

    const resp: Response = {
      kind: 'MULTIPART',
      value: {
        auto_part: { kind: 'INTEGER', value: '10' },
        open_part: { kind: 'CONSTRUCTED_RESPONSE', value: 'Detailed physical reasoning.' },
      },
    };

    const grade = evaluateResponse(resp, mixedContract);

    // Must be REVIEW_PENDING, points must be null (no premature sum of auto_part alone)
    assert.equal(grade.status, 'REVIEW_PENDING');
    assert.equal(grade.points, null);
    assert.equal(grade.reasonCode, ReasonCodes.PART_REVIEW_PENDING);
    assert(grade.parts);
    assert.equal(grade.parts['auto_part'].points, 1);
    assert.equal(grade.parts['open_part'].status, 'REVIEW_PENDING');
  });
});

describe('Fault N10 & Safety Handlers', () => {
  it('Fault N10: unsupported response kind returns UNSUPPORTED with clear explanation', () => {
    const contract: AssessmentContract = {
      id: 'asmt:unsupported',
      task_ref: makeTaskRef(),
      response_kind: 'SINGLE_CHOICE',
      evaluator: { mode: 'AUTOMATIC', canonical_value: 'A' },
      max_points: 1,
    };

    const fakeResp = { kind: 'NONEXISTENT_KIND', value: 'foo' } as unknown as Response;
    const grade = evaluateResponse(fakeResp, contract);

    assert.equal(grade.status, 'UNSUPPORTED');
    assert.equal(grade.points, null);
    assert.equal(grade.reasonCode, ReasonCodes.UNSUPPORTED_RESPONSE_KIND);
  });

  it('rejects response kind mismatch with contract', () => {
    const contract: AssessmentContract = {
      id: 'asmt:sc:mismatch',
      task_ref: makeTaskRef(),
      response_kind: 'SINGLE_CHOICE',
      evaluator: { mode: 'AUTOMATIC', canonical_value: 'A' },
      max_points: 1,
    };

    const resp: Response = { kind: 'INTEGER', value: '42' };
    const grade = evaluateResponse(resp, contract);

    assert.equal(grade.status, 'INVALID');
    assert.equal(grade.points, null);
    assert.equal(grade.reasonCode, ReasonCodes.KIND_MISMATCH);
  });

  it('supports FULL_CREDIT dropped item policy', () => {
    const contract: AssessmentContract = {
      id: 'asmt:dropped',
      task_ref: makeTaskRef(),
      response_kind: 'SINGLE_CHOICE',
      evaluator: { mode: 'AUTOMATIC', canonical_value: 'A' },
      max_points: 2,
      dropped_policy: 'FULL_CREDIT',
    };

    const resp: Response = { kind: 'SINGLE_CHOICE', value: 'WRONG_ANSWER' };
    const grade = evaluateResponse(resp, contract);

    assert.equal(grade.status, 'SCORED');
    assert.equal(grade.points, 2);
    assert.equal(grade.reasonCode, ReasonCodes.DROPPED_FULL_CREDIT);
  });
});

describe('StandardAssessmentEngine Integration', () => {
  it('resolves registered contracts and evaluates asynchronously', async () => {

    const contract: AssessmentContract = {
      id: 'asmt:reg:01',
      task_ref: makeTaskRef('task:reg:01'),
      response_kind: 'INTEGER',
      evaluator: { mode: 'AUTOMATIC', canonical_value: '100' },
      max_points: 4,
    };

    const {computeSha256,canonicalJson}=await import('../../web/runtime/loader.ts');
    const versioned={...contract,revision:1};
    const exact={type:'ASSESSMENT' as const,id:versioned.id,revision:1,sha256:await computeSha256(canonicalJson(versioned))};
    const engine = new StandardAssessmentEngine([{assessment:exact,task:versioned.task_ref as any}]);
    await assert.rejects(new StandardAssessmentEngine().registerContract(versioned,exact),/AUTHORITY|TRUST|UNAUTHORIZED/i);
    await engine.registerContract(versioned,exact);

    const resp: Response = { kind: 'INTEGER', value: '100' };
    const grade = await engine.evaluate(resp, exact, 'SIMULATED_EXAM',contract.task_ref as any);

    assert.equal(grade.status, 'SCORED');
    assert.equal(grade.points, 4);
  });

  it('returns INVALID with ASSESSMENT_NOT_FOUND when contract is missing', async () => {
    const engine = new StandardAssessmentEngine();
    const missingRef = makeTaskRef('task:nonexistent');
    const resp: Response = { kind: 'INTEGER', value: '100' };

    const grade = await engine.evaluate(resp, missingRef as any,'PRACTICE',makeTaskRef() as any);

    assert.equal(grade.status, 'INVALID');
    assert.equal(grade.points, null);
    assert.equal(grade.reasonCode, ReasonCodes.ASSESSMENT_NOT_FOUND);
  });
});

it('does not conflate SI case or round distinct large decimals',()=>{const task={type:'QUESTION' as const,id:'que:test',revision:1,sha256:'a'.repeat(64)};const c:AssessmentContract={id:'asmt:test',task_ref:task,response_kind:'NUMERIC_QUANTITY',evaluator:{mode:'AUTOMATIC',canonical_value:{decimal:'9007199254740992',unit:'m'}},max_points:1};assert.equal(evaluateResponse({kind:'NUMERIC_QUANTITY',value:{decimal:'9007199254740993',unit:'m'}},c).points,0);assert.equal(evaluateResponse({kind:'NUMERIC_QUANTITY',value:{decimal:'9007199254740992',unit:'M'}},c).status,'INVALID');});

import {readFileSync} from 'node:fs';
it('replays all 26 pinned synthetic scoring vectors',()=>{
 const vectors=JSON.parse(readFileSync('fixtures/synthetic/scoring-vectors.json','utf8'));
 const build=(p:any,id:string):AssessmentContract=>({id,task_ref:makeTaskRef(),response_kind:p.kind,max_points:p.max_points,evaluator:{mode:['SINGLE_CHOICE','MULTIPLE_CHOICE','INTEGER','NUMERIC_QUANTITY'].includes(p.kind)?'AUTOMATIC':'REVIEW_PENDING',...(p.correct===undefined?{}:{canonical_value:p.kind==='NUMERIC_QUANTITY'?{decimal:p.correct,unit:p.unit}:p.correct}),...(p.allowed?{allowed_options:p.allowed}:{}),...(p.abs_tol?{numeric_tolerance:Number(p.abs_tol),relative_tolerance:p.rel_tol,unit_factors:p.unit_factors}:{})},...(p.parts?{parts:Object.fromEntries(Object.entries(p.parts).map(([k,v])=>[k,build(v,k)]))}:{})});
 for(const v of vectors){const g=evaluateResponse(v.response,build(v.policy,v.id));assert.deepEqual({status:g.status,points:g.points,max_points:g.maxPoints},v.expected,v.id);}
});
