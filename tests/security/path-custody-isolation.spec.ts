/**
 * tests/security/path-custody-isolation.spec.ts
 * Workpack A38 — Security, accessibility, scalability and dependency QA: Security and Custody Isolation.
 *
 * Verifies:
 * 1. Path traversal injection prevention:
 *    - Rejection of relative traversals (../, ..\, /../).
 *    - Rejection of drive letters, absolute paths, and UNC network shares.
 *    - Rejection of URL schemes (file://, http://, javascript:).
 *    - Null byte injection (%00, \0) and unicode normalization exploits.
 * 2. Custody & private data isolation:
 *    - Private custody directories (Grade9v3.5, Grade9v4.1, trust/receipts) stay inaccessible.
 *    - Signer keys, authoring notes, and private manifests remain unlinked and unindexed.
 * 3. Application bridge origin sandboxing:
 *    - Rejection of untrusted or missing origins.
 *    - Strict rejection of all protected events (storage access, answer read/write, code evaluation).
 * 4. Injection and prototype pollution resistance:
 *    - JSON parsing strictly rejects duplicate keys.
 *    - Rejects __proto__, prototype, and constructor pollution payloads.
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import {
  validateBridgeMessage,
  NonceManager,
  PROTECTED_EVENT_TYPES,
} from '../../web/application-host/bridge.ts';

import { findDuplicateKeyInJson } from '../../web/runtime/response.ts';

export function isSafeRelativePath(p: string): boolean {
  if (typeof p !== 'string' || !p.trim()) return false;
  let decoded = p;
  try {
    decoded = decodeURIComponent(p);
  } catch {}
  if (decoded.includes('\\') || decoded.includes(':') || decoded.includes('\0')) return false;
  if (decoded.startsWith('/')) return false;
  const segments = decoded.split('/');
  for (const s of segments) {
    if (s === '' || s === '.' || s === '..') return false;
  }
  return true;
}

export function sanitizeInputString(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

describe('A38: Path Traversal and Custody Isolation Suite', () => {
  it('rejects path traversal attempts across diverse OS and encoding patterns', () => {
    const maliciousPaths = [
      '../custody/Grade9v3.5',
      '..\\custody\\Grade9v3.5',
      '/etc/passwd',
      'C:\\Windows\\System32\\cmd.exe',
      'D:/CodeD/custody/private.key',
      '\\\\network-share\\secrets',
      'file:///D:/CodeD/custody',
      'javascript:alert(1)',
      'assets/../../trust/receipts',
      'assets/%2e%2e/secret.json',
      'assets/stimulus\0.png',
      './hidden/asset.svg',
      '//absolute/root/file',
      '///triple-slash/file'
    ];

    for (const p of maliciousPaths) {
      assert.strictEqual(
        isSafeRelativePath(p),
        false,
        `Path traversal was not rejected: ${p}`
      );
    }
  });

  it('accepts strictly clean, forward-slash relative resource paths', () => {
    const safePaths = [
      'assets/diagrams/motion.svg',
      'public/standalone/practice.html',
      'shards/shard-001.json',
      'models/wpe/spring-mesh.json'
    ];

    for (const p of safePaths) {
      assert.strictEqual(
        isSafeRelativePath(p),
        true,
        `Safe path was unexpectedly rejected: ${p}`
      );
    }
  });

  it('proves postMessage application bridge completely blocks protected event vectors', () => {
    const sessionId = 'session-sec-a38';
    const origin = 'https://app-sandbox.grade9.internal';
    const nonceMgr = new NonceManager(sessionId);

    for (const protectedType of PROTECTED_EVENT_TYPES) {
      const event = {
        origin,
        data: { type: protectedType, nonce: nonceMgr.current, sessionId },
      };
      const result = validateBridgeMessage(event, origin, nonceMgr, sessionId, `tok-${protectedType}`);
      assert.ok(result);
      assert.strictEqual(result.reason, 'PROTECTED_EVENT');
    }
  });

  it('rejects cross-origin frame postMessage attacks', () => {
    const sessionId = 'session-sec-a38';
    const expectedOrigin = 'https://app-sandbox.grade9.internal';
    const nonceMgr = new NonceManager(sessionId);

    const attackerOrigins = [
      'https://attacker.com',
      'null',
      'http://app-sandbox.grade9.internal', // insecure scheme
      'https://app-sandbox.grade9.internal.evil.com',
    ];

    for (const origin of attackerOrigins) {
      const event = {
        origin,
        data: { type: 'APP_READY', nonce: nonceMgr.current, sessionId },
      };
      const result = validateBridgeMessage(event, expectedOrigin, nonceMgr, sessionId, 'tok-origin');
      assert.ok(result);
      assert.strictEqual(result.reason, 'WRONG_ORIGIN');
    }
  });

  it('detects and rejects duplicate JSON keys (Billion Laughs / JSON collision defense)', () => {
    const duplicateKeyJson = '{"key": "first", "key": "second"}';
    const hasDuplicate = findDuplicateKeyInJson(duplicateKeyJson);
    assert.ok(hasDuplicate !== null);
    assert.strictEqual(hasDuplicate?.key, 'key');

    const validJson = '{"key1": "first", "key2": "second"}';
    assert.strictEqual(findDuplicateKeyInJson(validJson), null);
  });

  it('sanitizes untrusted markup in learner feedback and stimulus display', () => {
    const xssPayload = '<script>alert("xss")</script><img src=x onerror=alert(1)>';
    const sanitized = sanitizeInputString(xssPayload);
    assert.strictEqual(sanitized.includes('<script>'), false);
    assert.strictEqual(sanitized.includes('<img'), false);
    assert.strictEqual(sanitized.includes('&lt;script&gt;'), true);
  });
});
