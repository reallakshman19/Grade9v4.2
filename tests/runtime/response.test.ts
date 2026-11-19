// Unit and contract tests for Response models and Capability Registry (Workpack A16).
// Verifies all 13 response types, recursive validation, stable IDs, duplicate rejects, safe fallbacks.
// Engineering validation: "No academic approval inferred from software validation."

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  RESPONSE_KINDS,
  ResponseValidationError,
  validateResponse,
  isResponse,
  parseResponseJson,
  findDuplicateKeyInJson,
  type ValidatedResponse,
} from '../../web/runtime/response.ts';
import {
  CapabilityRegistry,
  defaultCapabilityRegistry,
  createStandardCapability,
  createUnsupportedCapability,
} from '../../web/runtime/capabilities.ts';

describe('Response Validation - All 13 Platform Kinds', () => {
  it('defines exactly the 13 platform response kinds', () => {
    assert.equal(RESPONSE_KINDS.length, 13);
    const expected = [
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
    ];
    assert.deepEqual([...RESPONSE_KINDS], expected);
  });

  it('validates SINGLE_CHOICE response', () => {
    const valid = { kind: 'SINGLE_CHOICE', value: 'option_b' };
    const res = validateResponse(valid);
    assert.equal(res.kind, 'SINGLE_CHOICE');
    assert.equal(res.value, 'option_b');
    assert(isResponse(valid));

    assert.throws(
      () => validateResponse({ kind: 'SINGLE_CHOICE', value: '' }),
      (err: unknown) => err instanceof ResponseValidationError && err.code === 'EMPTY_VALUE'
    );
    assert.throws(
      () => validateResponse({ kind: 'SINGLE_CHOICE', value: 123 }),
      (err: unknown) => err instanceof ResponseValidationError && err.code === 'INVALID_VALUE_TYPE'
    );
  });

  it('validates MULTIPLE_CHOICE response with unique items requirement', () => {
    const valid = { kind: 'MULTIPLE_CHOICE', value: ['A', 'C', 'D'] };
    const res = validateResponse(valid);
    assert.equal(res.kind, 'MULTIPLE_CHOICE');
    assert.deepEqual(res.value, ['A', 'C', 'D']);

    // Rejects empty array
    assert.throws(
      () => validateResponse({ kind: 'MULTIPLE_CHOICE', value: [] }),
      (err: unknown) => err instanceof ResponseValidationError && err.code === 'EMPTY_VALUE'
    );

    // Rejects duplicates (uniqueItems)
    assert.throws(
      () => validateResponse({ kind: 'MULTIPLE_CHOICE', value: ['A', 'B', 'A'] }),
      (err: unknown) => err instanceof ResponseValidationError && err.code === 'DUPLICATE_ELEMENTS'
    );

    // Rejects empty string element
    assert.throws(
      () => validateResponse({ kind: 'MULTIPLE_CHOICE', value: ['A', ''] }),
      (err: unknown) => err instanceof ResponseValidationError && err.code === 'INVALID_VALUE_TYPE'
    );
  });

  it('validates INTEGER response against regex pattern ^-?[0-9]+$', () => {
    const pos = validateResponse({ kind: 'INTEGER', value: '42' });
    assert.equal(pos.value, '42');

    const neg = validateResponse({ kind: 'INTEGER', value: '-1250' });
    assert.equal(neg.value, '-1250');

    const zero = validateResponse({ kind: 'INTEGER', value: '0' });
    assert.equal(zero.value, '0');

    // Rejects floating point string
    assert.throws(
      () => validateResponse({ kind: 'INTEGER', value: '42.5' }),
      (err: unknown) => err instanceof ResponseValidationError && err.code === 'INVALID_FORMAT'
    );

    // Rejects non-numeric string
    assert.throws(
      () => validateResponse({ kind: 'INTEGER', value: '42a' }),
      (err: unknown) => err instanceof ResponseValidationError && err.code === 'INVALID_FORMAT'
    );

    // Rejects raw number (schema requires string formatted integer)
    assert.throws(
      () => validateResponse({ kind: 'INTEGER', value: 42 }),
      (err: unknown) => err instanceof ResponseValidationError && err.code === 'INVALID_VALUE_TYPE'
    );
  });

  it('validates NUMERIC_QUANTITY with decimal and unit', () => {
    const valid = {
      kind: 'NUMERIC_QUANTITY',
      value: { decimal: '19.6', unit: 'm/s^2' },
    };
    const res = validateResponse(valid);
    assert.equal(res.kind, 'NUMERIC_QUANTITY');
    assert.deepEqual(res.value, { decimal: '19.6', unit: 'm/s^2' });

    // Negative decimal
    const neg = validateResponse({
      kind: 'NUMERIC_QUANTITY',
      value: { decimal: '-0.05', unit: 'J' },
    });
    assert.equal(neg.value.decimal, '-0.05');

    // Rejects invalid decimal pattern
    assert.throws(
      () => validateResponse({ kind: 'NUMERIC_QUANTITY', value: { decimal: '12.3.4', unit: 'm' } }),
      (err: unknown) => err instanceof ResponseValidationError && err.code === 'INVALID_FORMAT'
    );

    // Rejects missing unit
    assert.throws(
      () => validateResponse({ kind: 'NUMERIC_QUANTITY', value: { decimal: '10' } }),
      (err: unknown) => err instanceof ResponseValidationError && err.code === 'MISSING_FIELD'
    );

    // Rejects empty unit
    assert.throws(
      () => validateResponse({ kind: 'NUMERIC_QUANTITY', value: { decimal: '10', unit: '' } }),
      (err: unknown) => err instanceof ResponseValidationError && err.code === 'EMPTY_VALUE'
    );

    // Rejects extra properties (additionalProperties: false)
    assert.throws(
      () => validateResponse({ kind: 'NUMERIC_QUANTITY', value: { decimal: '10', unit: 'm', tolerance: 0.1 } }),
      (err: unknown) => err instanceof ResponseValidationError && err.code === 'EXTRA_PROPERTIES'
    );
  });

  it('validates SYMBOLIC_EXPRESSION response', () => {
    const valid = { kind: 'SYMBOLIC_EXPRESSION', value: '\\int_{0}^{t} v(s) ds' };
    const res = validateResponse(valid);
    assert.equal(res.kind, 'SYMBOLIC_EXPRESSION');
    assert.equal(res.value, '\\int_{0}^{t} v(s) ds');

    assert.throws(
      () => validateResponse({ kind: 'SYMBOLIC_EXPRESSION', value: '' }),
      (err: unknown) => err instanceof ResponseValidationError && err.code === 'EMPTY_VALUE'
    );
  });

  it('validates CONSTRUCTED_RESPONSE response', () => {
    const valid = { kind: 'CONSTRUCTED_RESPONSE', value: 'Work equals force times displacement.' };
    const res = validateResponse(valid);
    assert.equal(res.kind, 'CONSTRUCTED_RESPONSE');

    assert.throws(
      () => validateResponse({ kind: 'CONSTRUCTED_RESPONSE', value: '' }),
      (err: unknown) => err instanceof ResponseValidationError && err.code === 'EMPTY_VALUE'
    );
  });

  it('validates MATHEMATICAL_PROOF response', () => {
    const valid = { kind: 'MATHEMATICAL_PROOF', value: 'Base case n=1 holds. Assume n=k. Then n=k+1 holds.' };
    const res = validateResponse(valid);
    assert.equal(res.kind, 'MATHEMATICAL_PROOF');

    assert.throws(
      () => validateResponse({ kind: 'MATHEMATICAL_PROOF', value: '' }),
      (err: unknown) => err instanceof ResponseValidationError && err.code === 'EMPTY_VALUE'
    );
  });

  it('validates CHEMICAL_STRUCTURE response', () => {
    const valid = {
      kind: 'CHEMICAL_STRUCTURE',
      value: { format: 'SMILES', data: 'CCO' },
    };
    const res = validateResponse(valid);
    assert.equal(res.kind, 'CHEMICAL_STRUCTURE');
    assert.deepEqual(res.value, { format: 'SMILES', data: 'CCO' });

    // Missing format
    assert.throws(
      () => validateResponse({ kind: 'CHEMICAL_STRUCTURE', value: { data: 'CCO' } }),
      (err: unknown) => err instanceof ResponseValidationError && err.code === 'MISSING_FIELD'
    );

    // Empty data
    assert.throws(
      () => validateResponse({ kind: 'CHEMICAL_STRUCTURE', value: { format: 'InChI', data: '' } }),
      (err: unknown) => err instanceof ResponseValidationError && err.code === 'MISSING_FIELD'
    );

    // Extra properties
    assert.throws(
      () => validateResponse({ kind: 'CHEMICAL_STRUCTURE', value: { format: 'SMILES', data: 'CCO', notes: 'ethanol' } }),
      (err: unknown) => err instanceof ResponseValidationError && err.code === 'EXTRA_PROPERTIES'
    );
  });

  it('validates REACTION_MECHANISM response', () => {
    const valid = {
      kind: 'REACTION_MECHANISM',
      value: ['Step 1: Protonation of carbonyl oxygen', 'Step 2: Nucleophilic addition'],
    };
    const res = validateResponse(valid);
    assert.equal(res.kind, 'REACTION_MECHANISM');
    assert.equal(res.value.length, 2);

    // Rejects empty steps array
    assert.throws(
      () => validateResponse({ kind: 'REACTION_MECHANISM', value: [] }),
      (err: unknown) => err instanceof ResponseValidationError && err.code === 'EMPTY_VALUE'
    );
  });

  it('validates DATA_TABLE response with string or null cells', () => {
    const valid = {
      kind: 'DATA_TABLE',
      value: [
        ['Trial', 'Time (s)', 'Current (A)'],
        ['1', '0.5', '2.1'],
        ['2', '1.0', null],
      ],
    };
    const res = validateResponse(valid);
    assert.equal(res.kind, 'DATA_TABLE');
    assert.equal(res.value.length, 3);
    assert.equal(res.value[2][2], null);

    // Rejects empty table
    assert.throws(
      () => validateResponse({ kind: 'DATA_TABLE', value: [] }),
      (err: unknown) => err instanceof ResponseValidationError && err.code === 'EMPTY_VALUE'
    );

    // Rejects cell that is a number
    assert.throws(
      () => validateResponse({ kind: 'DATA_TABLE', value: [[123]] }),
      (err: unknown) => err instanceof ResponseValidationError && err.code === 'INVALID_VALUE_TYPE'
    );
  });

  it('validates GRAPH response points', () => {
    const valid = {
      kind: 'GRAPH',
      value: {
        points: [
          ['0.0', '0.0'],
          ['1.0', '5.0'],
          ['2.0', '20.0'],
        ],
      },
    };
    const res = validateResponse(valid);
    assert.equal(res.kind, 'GRAPH');
    assert.equal(res.value.points.length, 3);

    // Rejects empty points
    assert.throws(
      () => validateResponse({ kind: 'GRAPH', value: { points: [] } }),
      (err: unknown) => err instanceof ResponseValidationError && err.code === 'EMPTY_VALUE'
    );

    // Rejects non-2-tuple point
    assert.throws(
      () => validateResponse({ kind: 'GRAPH', value: { points: [['1.0']] } }),
      (err: unknown) => err instanceof ResponseValidationError && err.code === 'INVALID_FORMAT'
    );

    // Rejects extra properties
    assert.throws(
      () => validateResponse({ kind: 'GRAPH', value: { points: [['0', '0']], title: 'Velocity' } }),
      (err: unknown) => err instanceof ResponseValidationError && err.code === 'EXTRA_PROPERTIES'
    );
  });

  it('validates EXPERIMENT_ANALYSIS response', () => {
    const valid = {
      kind: 'EXPERIMENT_ANALYSIS',
      value: {
        observations: ['Precipitate formed immediately', 'Solution changed color to yellow'],
        conclusion: 'Double displacement reaction occurred yielding lead iodide.',
      },
    };
    const res = validateResponse(valid);
    assert.equal(res.kind, 'EXPERIMENT_ANALYSIS');
    assert.equal(res.value.observations.length, 2);

    // Missing observations
    assert.throws(
      () => validateResponse({ kind: 'EXPERIMENT_ANALYSIS', value: { conclusion: 'Done' } }),
      (err: unknown) => err instanceof ResponseValidationError && err.code === 'MISSING_FIELD'
    );

    // Missing conclusion
    assert.throws(
      () => validateResponse({ kind: 'EXPERIMENT_ANALYSIS', value: { observations: ['Observed'] } }),
      (err: unknown) => err instanceof ResponseValidationError && err.code === 'MISSING_FIELD'
    );
  });
});

describe('Recursive MULTIPART Responses and Stable IDs', () => {
  it('validates flat multipart with multiple valid sub-responses', () => {
    const multipart = {
      kind: 'MULTIPART',
      value: {
        part_1: { kind: 'SINGLE_CHOICE', value: 'opt_a' },
        part_2: { kind: 'INTEGER', value: '100' },
        part_3: { kind: 'NUMERIC_QUANTITY', value: { decimal: '5.5', unit: 'm' } },
      },
    };

    const res = validateResponse(multipart);
    assert.equal(res.kind, 'MULTIPART');
    assert.equal(Object.keys(res.value).length, 3);
    assert.equal(res.value['part_1'].kind, 'SINGLE_CHOICE');
    assert.equal(res.value['part_2'].kind, 'INTEGER');
    assert.equal(res.value['part_3'].kind, 'NUMERIC_QUANTITY');
  });

  it('validates nested multipart responses', () => {
    const nested = {
      kind: 'MULTIPART',
      value: {
        section_a: {
          kind: 'MULTIPART',
          value: {
            sub_1: { kind: 'SINGLE_CHOICE', value: 'A' },
            sub_2: { kind: 'SINGLE_CHOICE', value: 'B' },
          },
        },
        section_b: {
          kind: 'INTEGER',
          value: '42',
        },
      },
    };

    const res = validateResponse(nested);
    assert.equal(res.kind, 'MULTIPART');
    assert.equal(res.value['section_a'].kind, 'MULTIPART');
  });

  it('rejects empty multipart with EMPTY_MULTIPART', () => {
    assert.throws(
      () => validateResponse({ kind: 'MULTIPART', value: {} }),
      (err: unknown) => err instanceof ResponseValidationError && err.code === 'EMPTY_MULTIPART'
    );
  });

  it('rejects unstable or invalid part IDs', () => {
    // Space in part ID
    assert.throws(
      () =>
        validateResponse({
          kind: 'MULTIPART',
          value: {
            'part 1 with space': { kind: 'SINGLE_CHOICE', value: 'A' },
          },
        }),
      (err: unknown) => err instanceof ResponseValidationError && err.code === 'INVALID_PART_ID'
    );

    // Empty string part ID
    assert.throws(
      () =>
        validateResponse({
          kind: 'MULTIPART',
          value: {
            '': { kind: 'SINGLE_CHOICE', value: 'A' },
          },
        }),
      (err: unknown) => err instanceof ResponseValidationError && err.code === 'INVALID_PART_ID'
    );
  });

  it('rejects invalid sub-response inside multipart with path attribution', () => {
    assert.throws(
      () =>
        validateResponse({
          kind: 'MULTIPART',
          value: {
            part_a: { kind: 'SINGLE_CHOICE', value: 'A' },
            part_b: { kind: 'INTEGER', value: 'not-an-integer' },
          },
        }),
      (err: unknown) => {
        assert(err instanceof ResponseValidationError);
        assert.equal(err.code, 'INVALID_FORMAT');
        assert(err.path.includes('part_b'));
        return true;
      }
    );
  });

  it('rejects recursion exceeding MAX_RECURSION_DEPTH', () => {
    let deep: Record<string, unknown> = { kind: 'INTEGER', value: '1' };
    for (let i = 0; i < 20; i++) {
      deep = {
        kind: 'MULTIPART',
        value: { [`level_${i}`]: deep },
      };
    }

    assert.throws(
      () => validateResponse(deep),
      (err: unknown) => err instanceof ResponseValidationError && err.code === 'RECURSION_LIMIT_EXCEEDED'
    );
  });
});

describe('JSON Duplicate Key Detection and Parsing', () => {
  it('detects duplicate keys in raw JSON text', () => {
    const rawWithDup = '{"part_1": 1, "part_1": 2}';
    const dup = findDuplicateKeyInJson(rawWithDup);
    assert.notEqual(dup, null);
    assert.equal(dup?.key, 'part_1');

    const clean = '{"part_1": 1, "part_2": 2}';
    assert.equal(findDuplicateKeyInJson(clean), null);
  });

  it('ignores colons and braces inside string literals when detecting duplicates', () => {
    const jsonWithColonsInStrings = JSON.stringify({
      kind: 'SINGLE_CHOICE',
      value: 'Key: Value in string {foo: bar}',
    });
    assert.equal(findDuplicateKeyInJson(jsonWithColonsInStrings), null);
  });

  it('parseResponseJson fails closed on duplicate multipart keys', () => {
    const duplicatePayload = `{
      "kind": "MULTIPART",
      "value": {
        "part_1": { "kind": "SINGLE_CHOICE", "value": "A" },
        "part_1": { "kind": "SINGLE_CHOICE", "value": "B" }
      }
    }`;

    assert.throws(
      () => parseResponseJson(duplicatePayload),
      (err: unknown) => {
        assert(err instanceof ResponseValidationError);
        assert.equal(err.code, 'DUPLICATE_PART_ID');
        return true;
      }
    );
  });

  it('parseResponseJson parses clean JSON successfully', () => {
    const cleanPayload = JSON.stringify({
      kind: 'NUMERIC_QUANTITY',
      value: { decimal: '10.5', unit: 'm' },
    });

    const parsed = parseResponseJson(cleanPayload);
    assert.equal(parsed.kind, 'NUMERIC_QUANTITY');
  });

  it('parseResponseJson rejects malformed JSON', () => {
    assert.throws(
      () => parseResponseJson('{ invalid json string ...'),
      (err: unknown) => err instanceof ResponseValidationError && err.code === 'MALFORMED_JSON'
    );
  });
});

describe('Capability Registry and Safe Fallbacks', () => {
  it('defaultCapabilityRegistry contains all 13 standard capabilities', () => {
    const kinds = defaultCapabilityRegistry.getRegisteredKinds();
    assert.equal(kinds.length, 13);
    for (const kind of RESPONSE_KINDS) {
      assert(defaultCapabilityRegistry.has(kind), `Kind '${kind}' must be registered`);
      const cap = defaultCapabilityRegistry.get(kind);
      assert.notEqual(cap, undefined);
      assert.equal(cap?.kind, kind);
      assert.equal(cap?.supportsOffline, true);
    }
  });

  it('standard capability validates raw values and wrapped responses', () => {
    const singleCap = defaultCapabilityRegistry.get('SINGLE_CHOICE');
    assert(singleCap);

    // Validate raw value string
    const r1 = singleCap.validate('option_a');
    assert.deepEqual(r1,{ok:true,value:{kind:'SINGLE_CHOICE',value:'option_a'}});
    const r2=singleCap.validate({kind:'SINGLE_CHOICE',value:'option_b'});
    assert.deepEqual(r2,{ok:true,value:{kind:'SINGLE_CHOICE',value:'option_b'}});
    assert.deepEqual(singleCap.validate({kind:'INTEGER',value:'42'}),{ok:false,reasonCode:'KIND_MISMATCH'});
  });

  it('standard capability mounts safely in headless environment', () => {
    const intCap = defaultCapabilityRegistry.get('INTEGER');
    assert(intCap);

    // Mount with mock root
    const mockRoot = {
      appendChild: () => {},
    } as unknown as HTMLElement;

    const unmount = intCap.mount(mockRoot, null, () => {});
    assert.equal(typeof unmount, 'function');
    unmount(); // Safe cleanup
  });

  it('returns safe fallback capability for unknown or unsupported kind', () => {
    const fallback = defaultCapabilityRegistry.getOrFallback('QUANTUM_CIRCUIT_STATE');
    assert.equal(fallback.kind, 'QUANTUM_CIRCUIT_STATE');
    assert.equal(fallback.supportsOffline, false);

    // Calling validate on fallback fails closed
    assert.deepEqual(fallback.validate({test:true}),{ok:false,reasonCode:'UNSUPPORTED_KIND'});

    // Calling mount on fallback is safe no-op
    const mockRoot = {} as HTMLElement;
    const unmount = fallback.mount(mockRoot, null, () => {});
    assert.equal(typeof unmount, 'function');
    unmount();
  });

  it('custom registry allows registration and unregistration', () => {
    const custom = new CapabilityRegistry();
    assert.equal(custom.getAll().length, 0);

    const cap = createStandardCapability('INTEGER');
    custom.register(cap);
    assert.equal(custom.has('INTEGER'), true);
    assert.equal(custom.get('INTEGER')?.kind, 'INTEGER');

    const removed = custom.unregister('INTEGER');
    assert.equal(removed, true);
    assert.equal(custom.has('INTEGER'), false);
  });

  it('operates purely on structural response contracts without subject-specific dispatch', () => {
    // Physics, Mathematics, and Chemistry responses use identical capability validation
    const mathExp = defaultCapabilityRegistry.get('SYMBOLIC_EXPRESSION')?.validate('x^2 + y^2 = r^2');
    assert.equal(mathExp?.ok && mathExp.value.kind, 'SYMBOLIC_EXPRESSION');

    const physQuantity = defaultCapabilityRegistry.get('NUMERIC_QUANTITY')?.validate({ decimal: '9.8', unit: 'm/s^2' });
    assert.equal(physQuantity?.ok && physQuantity.value.kind, 'NUMERIC_QUANTITY');

    const chemStruct = defaultCapabilityRegistry.get('CHEMICAL_STRUCTURE')?.validate({ format: 'SMILES', data: 'O=C=O' });
    assert.equal(chemStruct?.ok && chemStruct.value.kind, 'CHEMICAL_STRUCTURE');
  });
});

it('rejects escaped duplicate JSON keys and extra multipart aliases',()=>{assert.throws(()=>parseResponseJson('{"kind":"MULTIPART","value":{"a":{"kind":"INTEGER","value":"1"},"\\u0061":{"kind":"INTEGER","value":"2"}}}'),/DUPLICATE_PART_ID/);assert.throws(()=>validateResponse({kind:'MULTIPART',value:{a:{kind:'INTEGER',value:'1'}},parts:{}}),/EXTRA_PROPERTIES/);});
it('retains prototype-shaped multipart IDs as own data, without pollution',()=>{const v=parseResponseJson('{"kind":"MULTIPART","value":{"__proto__":{"kind":"INTEGER","value":"1"}}}');assert(v.kind==='MULTIPART');assert(Object.hasOwn(v.value,'__proto__'));assert.deepEqual(v.value['__proto__'],{kind:'INTEGER',value:'1'});assert.deepEqual(Object.keys(v),['kind','value']);});

it('R2 Stage4: multipart raw kind and value identifiers are legal',()=>{
 const cap=createStandardCapability('MULTIPART');
 const value={kind:{kind:'INTEGER',value:'7'},value:{kind:'INTEGER',value:'8'}};
 const result=cap.validate(value);
 assert.equal(result.ok,true);
 if(result.ok)assert.deepEqual(JSON.parse(JSON.stringify(result.value)),{kind:'MULTIPART',value});
});
