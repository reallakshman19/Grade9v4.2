// Shared Scoring Engine for Grade9 Platform Runtime.
// Conforms to schemas/platform/assessment.schema.json (urn:g9:engineering:assessment:1).
// Pure structural evaluation engine: "No academic approval inferred from software validation."

import type { Kind, Response, Grade, GradeStatus, Ref, SessionMode } from './types.ts';
import type { AssessmentEngine } from './contracts.ts';
import { RESPONSE_KINDS, isResponseKind } from './response.ts';

export const SCORING_VERSION = 'g9-scoring/1.0';

export interface EvaluatorSpec {
  readonly mode: 'AUTOMATIC' | 'REVIEW_PENDING';
  readonly canonical_value?: unknown;
  readonly numeric_tolerance?: number | null;
  readonly rubric_ref?: string | null;
  readonly allowed_options?: readonly string[];
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
  return unit.trim().toLowerCase();
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
  const candidate = String(response.value ?? '').trim();
  if (!/^-?[0-9]+$/.test(candidate)) {
    return {
      status: 'INVALID',
      points: null,
      maxPoints: contract.max_points,
      reasonCode: ReasonCodes.INVALID_INTEGER_FORMAT,
    };
  }

  const canonicalRaw = contract.evaluator.canonical_value;
  const canonical = String(canonicalRaw ?? '').trim();
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

  const candDecStr = String(candidate.decimal ?? '').trim();
  const candUnit = String(candidate.unit ?? '').trim();

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

  const canonDecStr = String(canonical.decimal ?? '').trim();
  const canonUnit = String(canonical.unit ?? '').trim();

  // N13: Dimension/Unit mismatch check
  if (normalizeUnit(candUnit) !== normalizeUnit(canonUnit)) {
    return {
      status: 'INVALID',
      points: null,
      maxPoints: contract.max_points,
      reasonCode: ReasonCodes.DIMENSION_MISMATCH,
    };
  }

  const candVal = parseFloat(candDecStr);
  const canonVal = parseFloat(canonDecStr);
  const tolerance = contract.evaluator.numeric_tolerance ?? 0;

  if (Number.isNaN(candVal) || Number.isNaN(canonVal)) {
    return {
      status: 'INVALID',
      points: null,
      maxPoints: contract.max_points,
      reasonCode: ReasonCodes.INVALID_QUANTITY_FORMAT,
    };
  }

  const diff = Math.abs(candVal - canonVal);
  if (diff <= tolerance) {
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

  const partGrades: Record<string, Grade> = {};
  let hasMissingRequired = false;
  let hasReviewPending = false;
  let hasInvalid = false;
  let totalPoints = 0;
  let totalMaxPoints = 0;

  for (const partId of requiredPartIds) {
    const partContract = partContracts[partId];
    totalMaxPoints += partContract.max_points;

    const candPart = candParts[partId];
    if (!candPart) {
      // N14: missing required part
      hasMissingRequired = true;
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

    if (subGrade.status === 'REVIEW_PENDING') {
      hasReviewPending = true;
    } else if (subGrade.status === 'INVALID' || subGrade.status === 'UNSUPPORTED') {
      hasInvalid = true;
    } else if (subGrade.status === 'SCORED' && typeof subGrade.points === 'number') {
      totalPoints += subGrade.points;
    }
  }

  // Check for unexpected extra parts
  for (const candPartId of Object.keys(candParts)) {
    if (!partContracts[candPartId]) {
      partGrades[candPartId] = {
        status: 'INVALID',
        points: null,
        maxPoints: 0,
        reasonCode: ReasonCodes.UNEXPECTED_PART,
      };
      hasInvalid = true;
    }
  }

  const effectiveMaxPoints = contract.max_points > 0 ? contract.max_points : totalMaxPoints;

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
  if (hasReviewPending) {
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
  if (contract.evaluator.mode === 'REVIEW_PENDING') {
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
  private readonly contracts = new Map<string, AssessmentContract>();

  constructor(initialContracts?: readonly AssessmentContract[]) {
    if (initialContracts) {
      for (const c of initialContracts) {
        this.registerContract(c);
      }
    }
  }

  registerContract(contract: AssessmentContract): void {
    this.contracts.set(contract.id, contract);
    this.contracts.set(contract.task_ref.id, contract);
  }

  getContract(id: string): AssessmentContract | undefined {
    return this.contracts.get(id);
  }

  async evaluate(
    response: Response,
    assessment: Ref | AssessmentContract,
    mode: SessionMode = 'PRACTICE'
  ): Promise<Grade> {
    let contract: AssessmentContract | undefined;

    if ('evaluator' in assessment && 'response_kind' in assessment) {
      contract = assessment as AssessmentContract;
    } else {
      const ref = assessment as Ref;
      contract = this.contracts.get(ref.id);
    }

    if (!contract) {
      return {
        status: 'INVALID',
        points: null,
        maxPoints: 0,
        reasonCode: ReasonCodes.ASSESSMENT_NOT_FOUND,
      };
    }

    return evaluateResponse(response, contract, mode);
  }
}
