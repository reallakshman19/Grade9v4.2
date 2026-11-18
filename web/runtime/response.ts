// Validated Response models and recursive schema validators for Grade9 platform.
// Conforms to schemas/platform/response.schema.json (urn:g9:engineering:response:1).
// Engineering validation only: "No academic approval inferred from software validation."

import type { Kind } from './types.ts';

export const RESPONSE_KINDS = [
  'SINGLE_CHOICE',
  'MULTIPLE_CHOICE',
  'INTEGER',
  'NUMERIC_QUANTITY',
  'SYMBOLIC_EXPRESSION',
  'CONSTRUCTED_RESPONSE',
  'MATHEMATICAL_PROOF',
  'CHEMICAL_STRUCTURE',
  'REACTION_MECHANISM',
  'DATA_TABLE',
  'GRAPH',
  'EXPERIMENT_ANALYSIS',
  'MULTIPART',
] as const;

export type ResponseKind = (typeof RESPONSE_KINDS)[number];

export const STABLE_PART_ID_REGEX = /^[a-zA-Z0-9_.:-]{1,64}$/;
export const INTEGER_STRING_REGEX = /^-?[0-9]+$/;
export const NUMERIC_DECIMAL_REGEX = /^-?[0-9]+(\.[0-9]+)?$/;
export const MAX_RECURSION_DEPTH = 16;

export class ResponseValidationError extends Error {
  readonly code: string;
  readonly path: string;

  constructor(code: string, message: string, path = '') {
    super(path ? `[${path}] ${message} (${code})` : `${message} (${code})`);
    this.name = 'ResponseValidationError';
    this.code = code;
    this.path = path;
  }
}

export interface SingleChoiceResponse {
  readonly kind: 'SINGLE_CHOICE';
  readonly value: string;
}

export interface MultipleChoiceResponse {
  readonly kind: 'MULTIPLE_CHOICE';
  readonly value: readonly string[];
}

export interface IntegerResponse {
  readonly kind: 'INTEGER';
  readonly value: string;
}

export interface NumericQuantityValue {
  readonly decimal: string;
  readonly unit: string;
}

export interface NumericQuantityResponse {
  readonly kind: 'NUMERIC_QUANTITY';
  readonly value: NumericQuantityValue;
}

export interface SymbolicExpressionResponse {
  readonly kind: 'SYMBOLIC_EXPRESSION';
  readonly value: string;
}

export interface ConstructedResponse {
  readonly kind: 'CONSTRUCTED_RESPONSE';
  readonly value: string;
}

export interface MathematicalProofResponse {
  readonly kind: 'MATHEMATICAL_PROOF';
  readonly value: string;
}

export interface ChemicalStructureValue {
  readonly format: string;
  readonly data: string;
}

export interface ChemicalStructureResponse {
  readonly kind: 'CHEMICAL_STRUCTURE';
  readonly value: ChemicalStructureValue;
}

export interface ReactionMechanismResponse {
  readonly kind: 'REACTION_MECHANISM';
  readonly value: readonly string[];
}

export interface DataTableResponse {
  readonly kind: 'DATA_TABLE';
  readonly value: ReadonlyArray<ReadonlyArray<string | null>>;
}

export interface GraphValue {
  readonly points: ReadonlyArray<readonly [string, string]>;
}

export interface GraphResponse {
  readonly kind: 'GRAPH';
  readonly value: GraphValue;
}

export interface ExperimentAnalysisValue {
  readonly observations: readonly string[];
  readonly conclusion: string;
}

export interface ExperimentAnalysisResponse {
  readonly kind: 'EXPERIMENT_ANALYSIS';
  readonly value: ExperimentAnalysisValue;
}

export interface MultipartResponse {
  readonly kind: 'MULTIPART';
  readonly value: Readonly<Record<string, ValidatedResponse>>;
}

export type ValidatedResponse =
  | SingleChoiceResponse
  | MultipleChoiceResponse
  | IntegerResponse
  | NumericQuantityResponse
  | SymbolicExpressionResponse
  | ConstructedResponse
  | MathematicalProofResponse
  | ChemicalStructureResponse
  | ReactionMechanismResponse
  | DataTableResponse
  | GraphResponse
  | ExperimentAnalysisResponse
  | MultipartResponse;

// Alias to align with runtime interfaces.
export type Response = ValidatedResponse;

/**
 * Scan raw JSON text to detect duplicate object keys.
 * Standard JSON.parse silently overwrites duplicate keys, which violates schema uniqueness bounds.
 */
export function findDuplicateKeyInJson(jsonStr: string): { key: string; position: number } | null {
  const stack: Array<Set<string>> = [];
  let inString = false;
  let isEscaped = false;
  let currentString = '';
  let stringStartPos = -1;

  for (let i = 0; i < jsonStr.length; i++) {
    const char = jsonStr[i];

    if (inString) {
      if (isEscaped) {
        isEscaped = false;
        currentString += char;
      } else if (char === '\\') {
        isEscaped = true;
        currentString += char;
      } else if (char === '"') {
        inString = false;
        // Peek forward through whitespace to check if followed by ':'
        let j = i + 1;
        while (j < jsonStr.length && /\s/.test(jsonStr[j])) {
          j++;
        }
        if (j < jsonStr.length && jsonStr[j] === ':') {
          // This string was an object key
          if (stack.length > 0) {
            const currentScope = stack[stack.length - 1];
            const decodedKey = JSON.parse(jsonStr.slice(stringStartPos,i+1)) as string;
            if (currentScope.has(decodedKey)) {
              return { key: decodedKey, position: stringStartPos };
            }
            currentScope.add(decodedKey);
          }
        }
      } else {
        currentString += char;
      }
    } else {
      if (char === '"') {
        inString = true;
        isEscaped = false;
        currentString = '';
        stringStartPos = i;
      } else if (char === '{') {
        stack.push(new Set<string>());
      } else if (char === '}') {
        stack.pop();
      }
    }
  }

  return null;
}

/**
 * Parses JSON and fails closed if duplicate object keys are detected.
 */
export function parseResponseJson(jsonString: string): ValidatedResponse {
  let duplicate: ReturnType<typeof findDuplicateKeyInJson>;
  try { duplicate = findDuplicateKeyInJson(jsonString); } catch { throw new ResponseValidationError('MALFORMED_JSON','Invalid JSON key'); }
  if (duplicate) {
    throw new ResponseValidationError(
      'DUPLICATE_PART_ID',
      `Duplicate key detected in response payload: "${duplicate.key}"`,
      duplicate.key
    );
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonString);
  } catch (err: unknown) {
    throw new ResponseValidationError(
      'MALFORMED_JSON',
      `Failed to parse response JSON: ${err instanceof Error ? err.message : String(err)}`
    );
  }

  return validateResponse(parsed);
}

/**
 * Type-guard checking whether a kind is a valid platform response kind.
 */
export function isResponseKind(kind: unknown): kind is ResponseKind {
  return typeof kind === 'string' && (RESPONSE_KINDS as readonly string[]).includes(kind);
}

/**
 * Recursively validates a response payload against schemas/platform/response.schema.json.
 */
export function validateResponse(input: unknown, path = '', depth = 0): ValidatedResponse {
  if (depth > MAX_RECURSION_DEPTH) {
    throw new ResponseValidationError(
      'RECURSION_LIMIT_EXCEEDED',
      `Exceeded maximum nesting depth of ${MAX_RECURSION_DEPTH}`,
      path
    );
  }

  if (typeof input !== 'object' || input === null || Array.isArray(input)) {
    throw new ResponseValidationError(
      'INVALID_RESPONSE_OBJECT',
      'Response must be a non-null object',
      path
    );
  }

  const raw = input as Record<string, unknown>;

  if (!Object.hasOwn(raw,'kind')) {
    throw new ResponseValidationError('MISSING_KIND', "Missing required property 'kind'", path);
  }

  if (!Object.hasOwn(raw,'value')) {
    throw new ResponseValidationError('MISSING_VALUE', "Missing required property 'value'", path);
  }

  const kind = raw.kind;
  if (typeof kind !== 'string') {
    throw new ResponseValidationError('INVALID_KIND_TYPE', "'kind' must be a string", path);
  }

  if (!isResponseKind(kind)) {
    throw new ResponseValidationError('UNKNOWN_KIND', `Unknown response kind: '${kind}'`, path);
  }

  // Enforce additionalProperties: false at root (allow 'parts' only on MULTIPART as convenience alias)
  for (const key of Object.keys(raw)) {
    if (key !== 'kind' && key !== 'value') {
      
      throw new ResponseValidationError(
        'EXTRA_PROPERTIES',
        `Disallowed property '${key}' for response object`,
        path ? `${path}.${key}` : key
      );
    }
  }

  const val = raw.value;

  switch (kind) {
    case 'SINGLE_CHOICE': {
      if (typeof val !== 'string') {
        throw new ResponseValidationError('INVALID_VALUE_TYPE', 'SINGLE_CHOICE value must be a string', path);
      }
      if (val.length < 1) {
        throw new ResponseValidationError('EMPTY_VALUE', 'SINGLE_CHOICE value must have minLength 1', path);
      }
      return { kind, value: val };
    }

    case 'MULTIPLE_CHOICE': {
      if (!Array.isArray(val)) {
        throw new ResponseValidationError('INVALID_VALUE_TYPE', 'MULTIPLE_CHOICE value must be an array', path);
      }
      if (val.length < 1) {
        throw new ResponseValidationError('EMPTY_VALUE', 'MULTIPLE_CHOICE value must have minItems 1', path);
      }
      const seen = new Set<string>();
      for (let i = 0; i < val.length; i++) {
        const item = val[i];
        if (typeof item !== 'string' || item.length < 1) {
          throw new ResponseValidationError(
            'INVALID_VALUE_TYPE',
            `MULTIPLE_CHOICE item at index ${i} must be a non-empty string`,
            `${path}[${i}]`
          );
        }
        if (seen.has(item)) {
          throw new ResponseValidationError(
            'DUPLICATE_ELEMENTS',
            `Duplicate choice '${item}' in MULTIPLE_CHOICE value`,
            `${path}[${i}]`
          );
        }
        seen.add(item);
      }
      return { kind, value: Object.freeze([...val]) };
    }

    case 'INTEGER': {
      if (typeof val !== 'string') {
        throw new ResponseValidationError('INVALID_VALUE_TYPE', 'INTEGER value must be a string formatted integer', path);
      }
      if (!INTEGER_STRING_REGEX.test(val)) {
        throw new ResponseValidationError('INVALID_FORMAT', `INTEGER value '${val}' does not match pattern ^-?[0-9]+$`, path);
      }
      return { kind, value: val };
    }

    case 'NUMERIC_QUANTITY': {
      if (typeof val !== 'object' || val === null || Array.isArray(val)) {
        throw new ResponseValidationError('INVALID_VALUE_TYPE', 'NUMERIC_QUANTITY value must be an object', path);
      }
      const q = val as Record<string, unknown>;
      for (const k of Object.keys(q)) {
        if (k !== 'decimal' && k !== 'unit') {
          throw new ResponseValidationError('EXTRA_PROPERTIES', `Disallowed property '${k}' in NUMERIC_QUANTITY`, `${path}.${k}`);
        }
      }
      if (!('decimal' in q) || typeof q.decimal !== 'string') {
        throw new ResponseValidationError('MISSING_FIELD', "NUMERIC_QUANTITY requires string 'decimal'", `${path}.decimal`);
      }
      if (!NUMERIC_DECIMAL_REGEX.test(q.decimal)) {
        throw new ResponseValidationError('INVALID_FORMAT', `decimal '${q.decimal}' does not match pattern ^-?[0-9]+(\\.[0-9]+)?$`, `${path}.decimal`);
      }
      if (!('unit' in q) || typeof q.unit !== 'string') {
        throw new ResponseValidationError('MISSING_FIELD', "NUMERIC_QUANTITY requires string 'unit'", `${path}.unit`);
      }
      if (q.unit.length < 1) {
        throw new ResponseValidationError('EMPTY_VALUE', 'unit must have minLength 1', `${path}.unit`);
      }
      return {
        kind,
        value: {
          decimal: q.decimal,
          unit: q.unit,
        },
      };
    }

    case 'SYMBOLIC_EXPRESSION': {
      if (typeof val !== 'string') {
        throw new ResponseValidationError('INVALID_VALUE_TYPE', 'SYMBOLIC_EXPRESSION value must be a string', path);
      }
      if (val.length < 1) {
        throw new ResponseValidationError('EMPTY_VALUE', 'SYMBOLIC_EXPRESSION value must have minLength 1', path);
      }
      return { kind, value: val };
    }

    case 'CONSTRUCTED_RESPONSE': {
      if (typeof val !== 'string') {
        throw new ResponseValidationError('INVALID_VALUE_TYPE', 'CONSTRUCTED_RESPONSE value must be a string', path);
      }
      if (val.length < 1) {
        throw new ResponseValidationError('EMPTY_VALUE', 'CONSTRUCTED_RESPONSE value must have minLength 1', path);
      }
      return { kind, value: val };
    }

    case 'MATHEMATICAL_PROOF': {
      if (typeof val !== 'string') {
        throw new ResponseValidationError('INVALID_VALUE_TYPE', 'MATHEMATICAL_PROOF value must be a string', path);
      }
      if (val.length < 1) {
        throw new ResponseValidationError('EMPTY_VALUE', 'MATHEMATICAL_PROOF value must have minLength 1', path);
      }
      return { kind, value: val };
    }

    case 'CHEMICAL_STRUCTURE': {
      if (typeof val !== 'object' || val === null || Array.isArray(val)) {
        throw new ResponseValidationError('INVALID_VALUE_TYPE', 'CHEMICAL_STRUCTURE value must be an object', path);
      }
      const cs = val as Record<string, unknown>;
      for (const k of Object.keys(cs)) {
        if (k !== 'format' && k !== 'data') {
          throw new ResponseValidationError('EXTRA_PROPERTIES', `Disallowed property '${k}' in CHEMICAL_STRUCTURE`, `${path}.${k}`);
        }
      }
      if (!('format' in cs) || typeof cs.format !== 'string' || cs.format.length < 1) {
        throw new ResponseValidationError('MISSING_FIELD', "CHEMICAL_STRUCTURE requires non-empty string 'format'", `${path}.format`);
      }
      if (!('data' in cs) || typeof cs.data !== 'string' || cs.data.length < 1) {
        throw new ResponseValidationError('MISSING_FIELD', "CHEMICAL_STRUCTURE requires non-empty string 'data'", `${path}.data`);
      }
      return {
        kind,
        value: {
          format: cs.format,
          data: cs.data,
        },
      };
    }

    case 'REACTION_MECHANISM': {
      if (!Array.isArray(val)) {
        throw new ResponseValidationError('INVALID_VALUE_TYPE', 'REACTION_MECHANISM value must be an array of strings', path);
      }
      if (val.length < 1) {
        throw new ResponseValidationError('EMPTY_VALUE', 'REACTION_MECHANISM value must have minItems 1', path);
      }
      for (let i = 0; i < val.length; i++) {
        const step = val[i];
        if (typeof step !== 'string' || step.length < 1) {
          throw new ResponseValidationError(
            'INVALID_VALUE_TYPE',
            `REACTION_MECHANISM step at index ${i} must be a non-empty string`,
            `${path}[${i}]`
          );
        }
      }
      return { kind, value: Object.freeze([...val]) };
    }

    case 'DATA_TABLE': {
      if (!Array.isArray(val)) {
        throw new ResponseValidationError('INVALID_VALUE_TYPE', 'DATA_TABLE value must be an array of rows', path);
      }
      if (val.length < 1) {
        throw new ResponseValidationError('EMPTY_VALUE', 'DATA_TABLE value must have minItems 1', path);
      }
      const frozenRows: Array<ReadonlyArray<string | null>> = [];
      for (let r = 0; r < val.length; r++) {
        const row = val[r];
        if (!Array.isArray(row)) {
          throw new ResponseValidationError(
            'INVALID_VALUE_TYPE',
            `DATA_TABLE row at index ${r} must be an array`,
            `${path}[${r}]`
          );
        }
        for (let c = 0; c < row.length; c++) {
          const cell = row[c];
          if (cell !== null && typeof cell !== 'string') {
            throw new ResponseValidationError(
              'INVALID_VALUE_TYPE',
              `DATA_TABLE cell at [${r}][${c}] must be a string or null`,
              `${path}[${r}][${c}]`
            );
          }
        }
        frozenRows.push(Object.freeze([...row]));
      }
      return { kind, value: Object.freeze(frozenRows) };
    }

    case 'GRAPH': {
      if (typeof val !== 'object' || val === null || Array.isArray(val)) {
        throw new ResponseValidationError('INVALID_VALUE_TYPE', 'GRAPH value must be an object', path);
      }
      const g = val as Record<string, unknown>;
      for (const k of Object.keys(g)) {
        if (k !== 'points') {
          throw new ResponseValidationError('EXTRA_PROPERTIES', `Disallowed property '${k}' in GRAPH value`, `${path}.${k}`);
        }
      }
      if (!('points' in g) || !Array.isArray(g.points)) {
        throw new ResponseValidationError('MISSING_FIELD', "GRAPH requires 'points' array", `${path}.points`);
      }
      if (g.points.length < 1) {
        throw new ResponseValidationError('EMPTY_VALUE', 'GRAPH points array must have minItems 1', `${path}.points`);
      }
      const frozenPoints: Array<readonly [string, string]> = [];
      for (let i = 0; i < g.points.length; i++) {
        const pt = g.points[i];
        if (!Array.isArray(pt) || pt.length !== 2 || typeof pt[0] !== 'string' || typeof pt[1] !== 'string') {
          throw new ResponseValidationError(
            'INVALID_FORMAT',
            `GRAPH point at index ${i} must be a 2-tuple of strings [string, string]`,
            `${path}.points[${i}]`
          );
        }
        frozenPoints.push(Object.freeze([pt[0], pt[1]]) as unknown as readonly [string, string]);
      }
      return {
        kind,
        value: {
          points: Object.freeze(frozenPoints),
        },
      };
    }

    case 'EXPERIMENT_ANALYSIS': {
      if (typeof val !== 'object' || val === null || Array.isArray(val)) {
        throw new ResponseValidationError('INVALID_VALUE_TYPE', 'EXPERIMENT_ANALYSIS value must be an object', path);
      }
      const exp = val as Record<string, unknown>;
      for (const k of Object.keys(exp)) {
        if (k !== 'observations' && k !== 'conclusion') {
          throw new ResponseValidationError('EXTRA_PROPERTIES', `Disallowed property '${k}' in EXPERIMENT_ANALYSIS`, `${path}.${k}`);
        }
      }
      if (!('observations' in exp) || !Array.isArray(exp.observations)) {
        throw new ResponseValidationError('MISSING_FIELD', "EXPERIMENT_ANALYSIS requires 'observations' array", `${path}.observations`);
      }
      if (exp.observations.length < 1) {
        throw new ResponseValidationError('EMPTY_VALUE', 'observations must have minItems 1', `${path}.observations`);
      }
      for (let i = 0; i < exp.observations.length; i++) {
        const obs = exp.observations[i];
        if (typeof obs !== 'string' || obs.length < 1) {
          throw new ResponseValidationError(
            'INVALID_VALUE_TYPE',
            `Observation at index ${i} must be a non-empty string`,
            `${path}.observations[${i}]`
          );
        }
      }
      if (!('conclusion' in exp) || typeof exp.conclusion !== 'string' || exp.conclusion.length < 1) {
        throw new ResponseValidationError('MISSING_FIELD', "EXPERIMENT_ANALYSIS requires non-empty string 'conclusion'", `${path}.conclusion`);
      }
      return {
        kind,
        value: {
          observations: Object.freeze([...exp.observations]),
          conclusion: exp.conclusion,
        },
      };
    }

    case 'MULTIPART': {
      if (typeof val !== 'object' || val === null || Array.isArray(val)) {
        throw new ResponseValidationError('INVALID_VALUE_TYPE', 'MULTIPART value must be an object mapping part IDs to responses', path);
      }
      const rawParts = val as Record<string, unknown>;
      const partIds = Object.keys(rawParts);
      if (partIds.length < 1) {
        throw new ResponseValidationError('EMPTY_MULTIPART', 'MULTIPART value must contain at least one part', path);
      }

      const validatedParts: Record<string, ValidatedResponse> = Object.create(null);
      for (const partId of partIds) {
        if (!STABLE_PART_ID_REGEX.test(partId)) {
          throw new ResponseValidationError(
            'INVALID_PART_ID',
            `Part ID '${partId}' is not a valid stable identifier (pattern ^[a-zA-Z0-9_.:-]{1,64}$)`,
            path ? `${path}.${partId}` : partId
          );
        }
        const subPath = path ? `${path}.${partId}` : partId;
        const subResponse = validateResponse(rawParts[partId], subPath, depth + 1);
        validatedParts[partId] = subResponse;
      }

      const frozenParts = Object.freeze(validatedParts);
      return {
        kind,
        value: frozenParts,
      };
    }

    default: {
      const _exhaustive: never = kind;
      throw new ResponseValidationError('UNKNOWN_KIND', `Unhandled kind '${_exhaustive}'`, path);
    }
  }
}

/**
 * Type guard for ValidatedResponse.
 */
export function isResponse(input: unknown): input is ValidatedResponse {
  try {
    validateResponse(input);
    return true;
  } catch {
    return false;
  }
}
