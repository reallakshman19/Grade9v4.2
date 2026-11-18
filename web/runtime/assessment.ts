// Shared Scoring Engine for Grade9 Platform Runtime.
// Conforms to schemas/platform/assessment.schema.json (urn:g9:engineering:assessment:1).
// Pure structural evaluation engine: "No academic approval inferred from software validation."

import type { Kind, Response, Grade, GradeStatus, Ref, SessionMode, TaskRef } from './types.ts';
import type { AssessmentEngine } from './contracts.ts';
import { RESPONSE_KINDS, isResponseKind, validateResponse, ResponseValidationError } from './response.ts';

import { canonicalJson, computeSha256, sameRef } from './loader.ts';

export const SCORING_VERSION = 'g9-scoring/1.1';
// Exact decimal addition over finite JS numbers' decimal wire representation.
function exactSum(values: readonly number[]): number {
  const parts=values.map(v=>{const [m,e='0']=String(v).split('e');return [BigInt(m.replace('.','')),(m.split('.')[1]?.length??0)-Number(e)] as const;});
  const scale=Math.max(0,...parts.map(p=>p[1]));
  const n=parts.reduce((sum,p)=>sum+p[0]*10n**BigInt(scale-p[1]),0n);
  const digits=(n<0n?-n:n).toString().padStart(scale+1,'0');
  const result=Number((n<0n?'-':'')+(scale?digits.slice(0,-scale)+'.'+digits.slice(-scale):digits));
  return result;
}
// Conservative, explicit SI conversion subset; unknown conversion pairs fail closed.
const UNITS:Readonly<Record<string,readonly [string,number]>>=Object.freeze({
  m:['length',1],cm:['length',0.01],mm:['length',0.001],km:['length',1000],
  s:['time',1],ms:['time',0.001],min:['time',60],h:['time',3600],
  kg:['mass',1],g:['mass',0.001],mg:['mass',0.000001],
  J:['energy',1],mJ:['energy',0.001],kJ:['energy',1000],
  N:['force',1],kN:['force',1000],W:['power',1],kW:['power',1000],
  Pa:['pressure',1],kPa:['pressure',1000],mol:['amount',1]
});
function conversionValid(factors:Readonly<Record<string,string>>,canonical:string):boolean {
  if(!Object.hasOwn(UNITS,canonical)||!Object.hasOwn(factors,canonical))return false;
  const [dimension,scale]=UNITS[canonical];
  // R4 factors are expressed in the canonical unit; require its identity factor.
  return Number(factors[canonical])===1&&Object.entries(factors).every(([unit,factor])=>Object.hasOwn(UNITS,unit)&&UNITS[unit][0]===dimension&&typeof factor==='string'&&/^[0-9]+(\.[0-9]+)?$/.test(factor)&&Number(factor)>0&&Number(factor)===UNITS[unit][1]/scale);
}
function validContract(c:AssessmentContract,depth=0):boolean {
  if(!c||depth>16||!isResponseKind(c.response_kind)||!Number.isFinite(c.max_points)||c.max_points<0||!c.evaluator||!['AUTOMATIC','REVIEW_PENDING'].includes(c.evaluator.mode))return false;
  if(c.dropped_policy!==undefined&&!['NOT_DROPPED','FULL_CREDIT','REMOVED_FROM_TOTAL'].includes(c.dropped_policy))return false;
  if(c.penalty_points!==undefined&&(!Number.isFinite(c.penalty_points)||c.penalty_points<0))return false;
  if(c.evaluator.numeric_tolerance!=null&&(!Number.isFinite(c.evaluator.numeric_tolerance)||c.evaluator.numeric_tolerance<0))return false;
  if(c.response_kind==='NUMERIC_QUANTITY'&&c.evaluator.unit_factors){
    const canonical=c.evaluator.canonical_value as {unit?:string}|null;
    if(!canonical?.unit||!conversionValid(c.evaluator.unit_factors,canonical.unit))return false;
  }
  if(c.parts){if(c.response_kind!=='MULTIPART'||!Object.keys(c.parts).length||!Object.values(c.parts).every(p=>validContract(p,depth+1)))return false;}
  return true;
}

export interface EvaluatorSpec {
  readonly mode: 'AUTOMATIC' | 'REVIEW_PENDING';
  readonly canonical_value?: unknown;
  readonly numeric_tolerance?: number | null;
  readonly rubric_ref?: string | null;
  readonly allowed_options?: readonly string[];
  readonly unit_factors?: Readonly<Record<string,string>>;
  readonly relative_tolerance?: string;
}

export interface AssessmentContract {
  readonly id: string;
  readonly task_ref: Ref;
  readonly response_kind: Kind;
  readonly evaluator: EvaluatorSpec;
  readonly max_points: number;
  readonly penalty_points?: number;
  readonly dropped_policy?: 'NOT_DROPPED' | 'FULL_CREDIT' | 'REMOVED_FROM_TOTAL';
  readonly status?: 'SYNTHETIC' | 'HOLD' | 'PROPOSED';
  readonly revision?: number;
  readonly parts?: Readonly<Record<string, AssessmentContract>>;
}

/**
 * Standard Reason Codes for Assessment Engine
 */
export const ReasonCodes = {
  // Single Choice
  CORRECT_CHOICE: 'CORRECT_CHOICE',
  INCORRECT_CHOICE: 'INCORRECT_CHOICE',
  INVALID_CHOICE_OPTION: 'INVALID_CHOICE_OPTION',

  // Multiple Choice
  CORRECT_SET: 'CORRECT_SET',
  INCORRECT_SET: 'INCORRECT_SET',
  DUPLICATE_CHOICE_OPTION: 'DUPLICATE_CHOICE_OPTION',

  // Integer
  CORRECT_INTEGER: 'CORRECT_INTEGER',
  INCORRECT_INTEGER: 'INCORRECT_INTEGER',
  INVALID_INTEGER_FORMAT: 'INVALID_INTEGER_FORMAT',

  // Numeric Quantity
  CORRECT_QUANTITY: 'CORRECT_QUANTITY',
  OUT_OF_TOLERANCE: 'OUT_OF_TOLERANCE',
  DIMENSION_MISMATCH: 'DIMENSION_MISMATCH',
  INVALID_QUANTITY_FORMAT: 'INVALID_QUANTITY_FORMAT',

  // Open & Manual Review
  MANUAL_REVIEW_REQUIRED: 'MANUAL_REVIEW_REQUIRED',

  // Multipart Compound
  ALL_PARTS_SCORED: 'ALL_PARTS_SCORED',
  PART_REVIEW_PENDING: 'PART_REVIEW_PENDING',
  PART_INVALID: 'PART_INVALID',
  MISSING_REQUIRED_PART: 'MISSING_REQUIRED_PART',
  UNEXPECTED_PART: 'UNEXPECTED_PART',

  // Generic / Policy / Safety
  UNSUPPORTED_RESPONSE_KIND: 'UNSUPPORTED_RESPONSE_KIND',
  KIND_MISMATCH: 'KIND_MISMATCH',
  MALFORMED_RESPONSE: 'MALFORMED_RESPONSE',
  ASSESSMENT_NOT_FOUND: 'ASSESSMENT_NOT_FOUND',
  DROPPED_FULL_CREDIT: 'DROPPED_FULL_CREDIT',
  DROPPED_REMOVED: 'DROPPED_REMOVED',
} as const;

export type ScoringReasonCode = (typeof ReasonCodes)[keyof typeof ReasonCodes] | string;

/**
 * Normalizes string unit representation (case-insensitive trim).
 */
function normalizeUnit(unit: string): string {
  return unit;
}

/**
 * Evaluates SINGLE_CHOICE response.
 */
function evaluateSingleChoice(response: Response, contract: AssessmentContract): Grade {
  const candidate = response.value;
  if (typeof candidate !== 'string' || candidate.length === 0) {
    return {
      status: 'INVALID',
      points: null,
      maxPoints: contract.max_points,
      reasonCode: ReasonCodes.INVALID_CHOICE_OPTION,
    };
  }

  // Check allowed options if configured
  if (contract.evaluator.allowed_options && !contract.evaluator.allowed_options.includes(candidate)) {
    return {
      status: 'INVALID',
      points: null,
      maxPoints: contract.max_points,
      reasonCode: ReasonCodes.INVALID_CHOICE_OPTION,
    };
  }

  const canonical = contract.evaluator.canonical_value;
  if (typeof canonical !== 'string') {
    return {
      status: 'REVIEW_PENDING',
      points: null,
      maxPoints: contract.max_points,
      reasonCode: ReasonCodes.MANUAL_REVIEW_REQUIRED,
    };
  }

  if (candidate === canonical) {
    return {
      status: 'SCORED',
      points: contract.max_points,
      maxPoints: contract.max_points,
      reasonCode: ReasonCodes.CORRECT_CHOICE,
    };
  }

  return {
    status: 'SCORED',
    points: 0,
    maxPoints: contract.max_points,
    reasonCode: ReasonCodes.INCORRECT_CHOICE,
  };
}

/**
 * Evaluates MULTIPLE_CHOICE response (Exact set semantics).
 */
function evaluateMultipleChoice(response: Response, contract: AssessmentContract): Grade {
  const candidate = response.value;
  if (!Array.isArray(candidate) || candidate.length === 0) {
    return {
      status: 'INVALID',
      points: null,
      maxPoints: contract.max_points,
      reasonCode: ReasonCodes.INVALID_CHOICE_OPTION,
    };
  }

  // Check uniqueness (N12 fault)
  const candidateSet = new Set(candidate);
  if (candidateSet.size !== candidate.length) {
    return {
      status: 'INVALID',
      points: null,
      maxPoints: contract.max_points,
      reasonCode: ReasonCodes.DUPLICATE_CHOICE_OPTION,
    };
  }

  // Check unknown options if allowed_options is provided (N12 fault)
  if (contract.evaluator.allowed_options) {
    const allowed = new Set(contract.evaluator.allowed_options);
    for (const opt of candidate) {
      if (!allowed.has(opt)) {
        return {
          status: 'INVALID',
          points: null,
          maxPoints: contract.max_points,
          reasonCode: ReasonCodes.INVALID_CHOICE_OPTION,
        };
      }
    }
  }

  const canonical = contract.evaluator.canonical_value;
  if (!Array.isArray(canonical)) {
    return {
      status: 'REVIEW_PENDING',
      points: null,
      maxPoints: contract.max_points,
      reasonCode: ReasonCodes.MANUAL_REVIEW_REQUIRED,
    };
  }

  const canonicalSet = new Set(canonical);
  if (candidateSet.size === canonicalSet.size && [...candidateSet].every(item => canonicalSet.has(item))) {
    return {
      status: 'SCORED',
      points: contract.max_points,
      maxPoints: contract.max_points,
      reasonCode: ReasonCodes.CORRECT_SET,
    };
  }

  return {
    status: 'SCORED',
    points: 0,
    maxPoints: contract.max_points,
    reasonCode: ReasonCodes.INCORRECT_SET,
  };
}

/**
 * Evaluates INTEGER response.
 */
function evaluateInteger(response: Response, contract: AssessmentContract): Grade {
  const candidate = typeof response.value==='string'?response.value:'';
  if (!/^-?[0-9]+$/.test(candidate)) {
    return {
      status: 'INVALID',
      points: null,
      maxPoints: contract.max_points,
      reasonCode: ReasonCodes.INVALID_INTEGER_FORMAT,
    };
  }

  const canonicalRaw = contract.evaluator.canonical_value;
  const canonical = typeof canonicalRaw==='string'?canonicalRaw:'';
  if (!/^-?[0-9]+$/.test(canonical)) {
    return {
      status: 'REVIEW_PENDING',
      points: null,
      maxPoints: contract.max_points,
      reasonCode: ReasonCodes.MANUAL_REVIEW_REQUIRED,
    };
  }

  try {
    const candInt = BigInt(candidate);
    const canonInt = BigInt(canonical);

    if (candInt === canonInt) {
      return {
        status: 'SCORED',
        points: contract.max_points,
        maxPoints: contract.max_points,
        reasonCode: ReasonCodes.CORRECT_INTEGER,
      };
    }
    return {
      status: 'SCORED',
      points: 0,
      maxPoints: contract.max_points,
      reasonCode: ReasonCodes.INCORRECT_INTEGER,
    };
  } catch {
    return {
      status: 'INVALID',
      points: null,
      maxPoints: contract.max_points,
      reasonCode: ReasonCodes.INVALID_INTEGER_FORMAT,
    };
  }
}

/**
 * Evaluates NUMERIC_QUANTITY response.
 */
function evaluateNumericQuantity(response: Response, contract: AssessmentContract): Grade {
  const candidate = response.value as { decimal?: unknown; unit?: unknown } | null;
  if (!candidate || typeof candidate !== 'object') {
    return {
      status: 'INVALID',
      points: null,
      maxPoints: contract.max_points,
      reasonCode: ReasonCodes.INVALID_QUANTITY_FORMAT,
    };
  }

  const candDecStr = typeof candidate.decimal==='string'?candidate.decimal:'';
  const candUnit = typeof candidate.unit==='string'?candidate.unit:'';

  if (!/^-?[0-9]+(\.[0-9]+)?$/.test(candDecStr) || candUnit.length === 0) {
    return {
      status: 'INVALID',
      points: null,
      maxPoints: contract.max_points,
      reasonCode: ReasonCodes.INVALID_QUANTITY_FORMAT,
    };
  }

  const canonical = contract.evaluator.canonical_value as { decimal?: unknown; unit?: unknown } | null;
  if (!canonical || typeof canonical !== 'object') {
    return {
      status: 'REVIEW_PENDING',
      points: null,
      maxPoints: contract.max_points,
      reasonCode: ReasonCodes.MANUAL_REVIEW_REQUIRED,
    };
  }

  const canonDecStr = typeof canonical.decimal==='string'?canonical.decimal:'';
  const canonUnit = typeof canonical.unit==='string'?canonical.unit:'';

  // N13: Dimension/Unit mismatch check
  const factors=contract.evaluator.unit_factors;
  if (normalizeUnit(candUnit) !== normalizeUnit(canonUnit) && (!factors||!Object.hasOwn(factors,candUnit)||!Object.hasOwn(factors,canonUnit))) {
    return {
      status: 'INVALID',
      points: null,
      maxPoints: contract.max_points,
      reasonCode: ReasonCodes.DIMENSION_MISMATCH,
    };
  }

  const tolerance=contract.evaluator.numeric_tolerance??0;
  if(!/^-?[0-9]+(\.[0-9]+)?$/.test(canonDecStr)||!Number.isFinite(tolerance)||tolerance<0||candDecStr.length>4096||canonDecStr.length>4096)return {status:'INVALID',points:null,maxPoints:contract.max_points,reasonCode:ReasonCodes.INVALID_QUANTITY_FORMAT};
  // Compare scaled decimal integers, not binary floats (including large integers).
  const tolText=String(tolerance);
  const decimal=(v:string):[bigint,number]=>{const [mantissa,exponent='0']=v.toLowerCase().split('e');const fraction=mantissa.split('.')[1]?.length??0;return [BigInt(mantissa.replace('.','')),fraction-Number(exponent)];};
  const validDecimal=(v:unknown):v is string=>typeof v==='string'&&v.length<=4096&&/^-?[0-9]+(\.[0-9]+)?$/.test(v);
  const mul=(a:[bigint,number],b:[bigint,number]):[bigint,number]=>[a[0]*b[0],a[1]+b[1]];
  let aa=decimal(candDecStr),bb=decimal(canonDecStr);
  if(factors){const af=factors[candUnit],bf=factors[canonUnit];if(!Object.hasOwn(factors,candUnit)||!Object.hasOwn(factors,canonUnit)||!validDecimal(af)||!validDecimal(bf)||decimal(af)[0]<=0n||decimal(bf)[0]<=0n)return {status:'INVALID',points:null,maxPoints:contract.max_points,reasonCode:ReasonCodes.DIMENSION_MISMATCH};aa=mul(aa,decimal(af));bb=mul(bb,decimal(bf));}
  const absTol=decimal(tolText),rel=contract.evaluator.relative_tolerance??'0';
  if(!validDecimal(rel)||decimal(rel)[0]<0n)return {status:'INVALID',points:null,maxPoints:contract.max_points,reasonCode:ReasonCodes.INVALID_QUANTITY_FORMAT};
  const relTol=mul([bb[0]<0n?-bb[0]:bb[0],bb[1]],decimal(rel));
  const scale=Math.max(aa[1],bb[1],absTol[1],relTol[1],0);
  const scaled=(v:[bigint,number])=>v[0]*10n**BigInt(scale-v[1]);
  const diff=scaled(aa)-scaled(bb),absolute=diff<0n?-diff:diff;
  if (absolute<=scaled(absTol)||absolute<=scaled(relTol)) {
    return {
      status: 'SCORED',
      points: contract.max_points,
      maxPoints: contract.max_points,
      reasonCode: ReasonCodes.CORRECT_QUANTITY,
    };
  }

  return {
    status: 'SCORED',
    points: 0,
    maxPoints: contract.max_points,
    reasonCode: ReasonCodes.OUT_OF_TOLERANCE,
  };
}

/**
 * Handles open responses (MATHEMATICAL_PROOF, CONSTRUCTED_RESPONSE, etc.)
 * N11: Never keywords match or auto-grade mathematical proofs or open text! Always REVIEW_PENDING.
 */
function evaluateOpenResponse(response: Response, contract: AssessmentContract): Grade {
  return {
    status: 'REVIEW_PENDING',
    points: null,
    maxPoints: contract.max_points,
    reasonCode: ReasonCodes.MANUAL_REVIEW_REQUIRED,
  };
}

/**
 * Evaluates MULTIPART compound responses with per-part aggregation.
 * N14: Missing required parts or incomplete sub-parts prevent total fabrication.
 */
function evaluateMultipart(
  response: Response,
  contract: AssessmentContract,
  mode: SessionMode
): Grade {
  const candParts = (response.value ?? (response as unknown as { parts?: unknown }).parts) as Record<string, Response> | null;
  if (!candParts || typeof candParts !== 'object' || Array.isArray(candParts)) {
    return {
      status: 'INVALID',
      points: null,
      maxPoints: contract.max_points,
      reasonCode: ReasonCodes.MALFORMED_RESPONSE,
    };
  }

  const partContracts = contract.parts ?? {};
  const requiredPartIds = Object.keys(partContracts);

  // If no parts configured in contract, default to REVIEW_PENDING
  if (requiredPartIds.length === 0) {
    return {
      status: 'REVIEW_PENDING',
      points: null,
      maxPoints: contract.max_points,
      reasonCode: ReasonCodes.MANUAL_REVIEW_REQUIRED,
    };
  }

  const partGrades: Record<string, Grade> = Object.create(null);
  let hasMissingRequired = false;
  let hasReviewPending = false;
  let hasInvalid = false;
  const pointParts:number[]=[];
  const declaredMaxParts:number[]=[];
  const effectiveMaxParts:number[]=[];

  for (const partId of requiredPartIds) {
    const partContract = partContracts[partId];
    declaredMaxParts.push(partContract.max_points);

    const candPart = Object.hasOwn(candParts,partId)?candParts[partId]:undefined;
    if (!candPart) {
      // N14: missing required part
      hasMissingRequired = true;
      effectiveMaxParts.push(partContract.max_points);
      partGrades[partId] = {
        status: 'INVALID',
        points: null,
        maxPoints: partContract.max_points,
        reasonCode: ReasonCodes.MISSING_REQUIRED_PART,
      };
      continue;
    }

    const subGrade = evaluateResponse(candPart, partContract, mode);
    partGrades[partId] = subGrade;
    effectiveMaxParts.push(subGrade.maxPoints);

    if (subGrade.status === 'REVIEW_PENDING') {
      hasReviewPending = true;
    } else if (subGrade.status === 'INVALID' || subGrade.status === 'UNSUPPORTED') {
      hasInvalid = true;
    } else if (subGrade.status === 'SCORED' && typeof subGrade.points === 'number') {
      pointParts.push(subGrade.points);
    }
  }

  // Check for unexpected extra parts
  for (const candPartId of Object.keys(candParts)) {
    if (!Object.hasOwn(partContracts,candPartId)) {
      partGrades[candPartId] = {
        status: 'INVALID',
        points: null,
        maxPoints: 0,
        reasonCode: ReasonCodes.UNEXPECTED_PART,
      };
      hasInvalid = true;
    }
  }

  const effectiveMaxPoints=exactSum(effectiveMaxParts),totalPoints=exactSum(pointParts);
  if(exactSum(declaredMaxParts)!==contract.max_points||!Number.isFinite(totalPoints)||totalPoints>effectiveMaxPoints)return {status:'INVALID',points:null,maxPoints:contract.max_points,reasonCode:'PART_TOTAL_MISMATCH'};

  // N14: Missing part -> incomplete/pending, no fabricated total!
  if (hasMissingRequired) {
    return {
      status: 'INVALID',
      points: null,
      maxPoints: effectiveMaxPoints,
      reasonCode: ReasonCodes.MISSING_REQUIRED_PART,
      parts: Object.freeze(partGrades),
    };
  }

  // Any part pending manual review -> entire multipart is REVIEW_PENDING with points: null
  if (hasReviewPending && !hasInvalid) {
    return {
      status: 'REVIEW_PENDING',
      points: null,
      maxPoints: effectiveMaxPoints,
      reasonCode: ReasonCodes.PART_REVIEW_PENDING,
      parts: Object.freeze(partGrades),
    };
  }

  // Any part invalid -> entire multipart is INVALID with points: null
  if (hasInvalid) {
    return {
      status: 'INVALID',
      points: null,
      maxPoints: effectiveMaxPoints,
      reasonCode: ReasonCodes.PART_INVALID,
      parts: Object.freeze(partGrades),
    };
  }

  // All parts scored
  return {
    status: 'SCORED',
    points: totalPoints,
    maxPoints: effectiveMaxPoints,
    reasonCode: ReasonCodes.ALL_PARTS_SCORED,
    parts: Object.freeze(partGrades),
  };
}

/**
 * Pure, idempotent response evaluation against an AssessmentContract.
 * Enforces N10–N14 contracts, pure evaluation, and zero subject-specific dispatch.
 */
export function evaluateResponse(
  response: Response,
  contract: AssessmentContract,
  mode: SessionMode = 'PRACTICE'
): Grade {
  if(!validContract(contract))return {status:'INVALID',points:null,maxPoints:0,reasonCode:'INVALID_ASSESSMENT'};
  if(!response||!isResponseKind(response.kind))return {status:'UNSUPPORTED',points:null,maxPoints:contract.max_points,reasonCode:ReasonCodes.UNSUPPORTED_RESPONSE_KIND};
  try{validateResponse(response);}catch(e){return {status:'INVALID',points:null,maxPoints:contract.max_points,reasonCode:e instanceof ResponseValidationError&&e.code==='DUPLICATE_ELEMENTS'?ReasonCodes.DUPLICATE_CHOICE_OPTION:response.kind==='INTEGER'?ReasonCodes.INVALID_INTEGER_FORMAT:response.kind==='NUMERIC_QUANTITY'?ReasonCodes.INVALID_QUANTITY_FORMAT:ReasonCodes.MALFORMED_RESPONSE};}
  if(response.kind!==contract.response_kind)return {status:'INVALID',points:null,maxPoints:contract.max_points,reasonCode:ReasonCodes.KIND_MISMATCH};
  // Handle dropped item policies
  if (contract.dropped_policy === 'FULL_CREDIT') {
    return {
      status: 'SCORED',
      points: contract.max_points,
      maxPoints: contract.max_points,
      reasonCode: ReasonCodes.DROPPED_FULL_CREDIT,
    };
  }
  if (contract.dropped_policy === 'REMOVED_FROM_TOTAL') {
    return {
      status: 'SCORED',
      points: 0,
      maxPoints: 0,
      reasonCode: ReasonCodes.DROPPED_REMOVED,
    };
  }

  // Check kind validity (N10 fault)
  if (!isResponseKind(response.kind)) {
    return {
      status: 'UNSUPPORTED',
      points: null,
      maxPoints: contract.max_points,
      reasonCode: ReasonCodes.UNSUPPORTED_RESPONSE_KIND,
    };
  }

  // Check kind mismatch between response and contract
  if (response.kind !== contract.response_kind) {
    return {
      status: 'INVALID',
      points: null,
      maxPoints: contract.max_points,
      reasonCode: ReasonCodes.KIND_MISMATCH,
    };
  }

  // If contract explicitly requires manual review, honour REVIEW_PENDING
  if (contract.evaluator.mode === 'REVIEW_PENDING' && !(response.kind==='MULTIPART'&&contract.parts)) {
    return {
      status: 'REVIEW_PENDING',
      points: null,
      maxPoints: contract.max_points,
      reasonCode: ReasonCodes.MANUAL_REVIEW_REQUIRED,
    };
  }

  // Dispatch based on response kind
  switch (response.kind) {
    case 'SINGLE_CHOICE':
      return evaluateSingleChoice(response, contract);

    case 'MULTIPLE_CHOICE':
      return evaluateMultipleChoice(response, contract);

    case 'INTEGER':
      return evaluateInteger(response, contract);

    case 'NUMERIC_QUANTITY':
      return evaluateNumericQuantity(response, contract);

    case 'MULTIPART':
      return evaluateMultipart(response, contract, mode);

    case 'CONSTRUCTED_RESPONSE':
    case 'MATHEMATICAL_PROOF':
    case 'CHEMICAL_STRUCTURE':
    case 'REACTION_MECHANISM':
    case 'DATA_TABLE':
    case 'GRAPH':
    case 'EXPERIMENT_ANALYSIS':
    case 'SYMBOLIC_EXPRESSION':
      // N11: Open response kinds require human academic judgment
      return evaluateOpenResponse(response, contract);

    default: {
      return {
        status: 'UNSUPPORTED',
        points: null,
        maxPoints: contract.max_points,
        reasonCode: ReasonCodes.UNSUPPORTED_RESPONSE_KIND,
      };
    }
  }
}

/**
 * Standard implementation of AssessmentEngine runtime contract.
 */
export class StandardAssessmentEngine implements AssessmentEngine {
  private readonly contracts=new Map<string,{ref:Ref<'ASSESSMENT'>;contract:AssessmentContract}>();
  private readonly authorized:readonly {readonly assessment:Ref<'ASSESSMENT'>;readonly task:TaskRef}[];
  // Only the trusted release bootstrap may supply this exact allowlist. Hash equality alone is not authority.
  constructor(authorized:readonly {readonly assessment:Ref<'ASSESSMENT'>;readonly task:TaskRef}[]=[]){this.authorized=structuredClone(authorized);}
  async registerContract(contract:AssessmentContract,ref:Ref<'ASSESSMENT'>):Promise<void>{
    const copy=structuredClone(contract);
    if(ref.type!=='ASSESSMENT'||ref.id!==copy.id||ref.revision!==copy.revision||ref.sha256!==await computeSha256(canonicalJson(copy)))throw new Error('ASSESSMENT_IDENTITY_MISMATCH');
    if(!validContract(copy)||!Number.isSafeInteger(copy.revision)||!copy.task_ref||!['QUESTION','FRESH_TASK'].includes(copy.task_ref.type))throw new Error('INVALID_ASSESSMENT');
    if(!this.authorized.some(a=>sameRef(a.assessment,ref)&&sameRef(a.task,copy.task_ref)))throw new Error('ASSESSMENT_NOT_AUTHORIZED');
    if(copy.evaluator.mode==='AUTOMATIC'&&['SINGLE_CHOICE','MULTIPLE_CHOICE','INTEGER','NUMERIC_QUANTITY'].includes(copy.response_kind)){
      validateResponse({kind:copy.response_kind,value:copy.evaluator.canonical_value});
      if(copy.response_kind==='SINGLE_CHOICE'||copy.response_kind==='MULTIPLE_CHOICE'){
        const opts=copy.evaluator.allowed_options,correct=Array.isArray(copy.evaluator.canonical_value)?copy.evaluator.canonical_value:[copy.evaluator.canonical_value];
        if(!opts||new Set(opts).size!==opts.length||!correct.every(x=>typeof x==='string'&&opts.includes(x)))throw new Error('INVALID_ASSESSMENT_OPTIONS');
      }
    }
    const key=ref.id+':'+ref.revision,old=this.contracts.get(key);
    if(old&&!sameRef(old.ref,ref))throw new Error('ASSESSMENT_REVISION_CONFLICT');
    this.contracts.set(key,{ref:{...ref},contract:copy});
  }
  async evaluate(response:Response,assessment:Ref<'ASSESSMENT'>,mode:SessionMode,task:TaskRef):Promise<Grade>{
    const entry=this.contracts.get(assessment.id+':'+assessment.revision);
    if(!entry||!sameRef(entry.ref,assessment)||!sameRef(entry.contract.task_ref,task))return {status:'INVALID',points:null,maxPoints:0,reasonCode:ReasonCodes.ASSESSMENT_NOT_FOUND};
    return evaluateResponse(response,entry.contract,mode);
  }
}
