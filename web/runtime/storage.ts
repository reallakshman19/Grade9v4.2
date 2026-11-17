// Storage Driver and Transaction abstractions for Grade9 Platform Runtime.
// Provides IndexedDB persistence with safe in-memory fallback for headless/CI runtimes.
// Engineering validation: "No academic approval inferred from software validation."

import type { Response, WorkArtifact, Session, Attempt } from './types.ts';

export class StorageError extends Error {
  readonly code: string;

  constructor(code: string, message: string) {
    super(`${message} (${code})`);
    this.name = 'StorageError';
    this.code = code;
  }
}

export interface DraftRecord {
  readonly sessionId: string;
  readonly response: Response;
  readonly artifacts: readonly WorkArtifact[];
  readonly savedAt: string;
  readonly revision: number;
}

export interface TransactionContext {
  get<T>(storeName: string, key: string): Promise<T | undefined>;
  put<T>(storeName: string, key: string, value: T): Promise<void>;
  delete(storeName: string, key: string): Promise<void>;
  getAll<T>(storeName: string): Promise<readonly T[]>;
}

export interface StorageDriver {
  get<T>(storeName: string, key: string): Promise<T | undefined>;
  put<T>(storeName: string, key: string, value: T): Promise<void>;
  delete(storeName: string, key: string): Promise<void>;
  getAll<T>(storeName: string): Promise<readonly T[]>;
  transaction<R>(
    storeNames: readonly string[],
    mode: 'readonly' | 'readwrite',
    operation: (tx: TransactionContext) => Promise<R>
  ): Promise<R>;
  clear(storeName?: string): Promise<void>;
  close(): Promise<void>;
}

export interface StorageDriverOptions {
  readonly preferMemory?: boolean;
  readonly quotaBytes?: number;
  readonly dbName?: string;
}

/**
 * In-memory transactional storage driver.
 * Implements transaction rollback, quota enforcement, and failure simulation.
 */
export class MemoryStorageDriver implements StorageDriver {
  private stores = new Map<string, Map<string, unknown>>();
  private quotaBytes: number;
  private currentBytes = 0;
  private failureHook: ((storeName: string, action: string) => StorageError | null) | null = null;

  constructor(options?: { quotaBytes?: number }) {
    this.quotaBytes = options?.quotaBytes ?? Infinity;
  }

  setQuota(bytes: number): void {
    this.quotaBytes = bytes;
  }

  setFailureHook(hook: ((storeName: string, action: string) => StorageError | null) | null): void {
    this.failureHook = hook;
  }

  private getStore(name: string): Map<string, unknown> {
    let store = this.stores.get(name);
    if (!store) {
      store = new Map<string, unknown>();
      this.stores.set(name, store);
    }
    return store;
  }

  private calculatePayloadSize(val: unknown): number {
    try {
      return new TextEncoder().encode(JSON.stringify(val)).length;
    } catch {
      return 128;
    }
  }

  async get<T>(storeName: string, key: string): Promise<T | undefined> {
    if (this.failureHook) {
      const err = this.failureHook(storeName, 'get');
      if (err) throw err;
    }
    const store = this.getStore(storeName);
    const item = store.get(key);
    if (item === undefined) return undefined;
    // Deep clone to prevent direct object reference mutation
    return JSON.parse(JSON.stringify(item)) as T;
  }

  async put<T>(storeName: string, key: string, value: T): Promise<void> {
    if (this.failureHook) {
      const err = this.failureHook(storeName, 'put');
      if (err) throw err;
    }

    const payloadSize = this.calculatePayloadSize(value);
    const existingSize = this.getStore(storeName).has(key)
      ? this.calculatePayloadSize(this.getStore(storeName).get(key))
      : 0;

    const projected = this.currentBytes - existingSize + payloadSize;
    if (projected > this.quotaBytes) {
      throw new StorageError(
        'QUOTA_EXCEEDED',
        `Storage quota exceeded: projected ${projected} bytes > limit ${this.quotaBytes} bytes`
      );
    }

    // Deep clone to isolate stored item
    this.getStore(storeName).set(key, JSON.parse(JSON.stringify(value)));
    this.currentBytes = projected;
  }

  async delete(storeName: string, key: string): Promise<void> {
    if (this.failureHook) {
      const err = this.failureHook(storeName, 'delete');
      if (err) throw err;
    }
    const store = this.getStore(storeName);
    if (store.has(key)) {
      const existingSize = this.calculatePayloadSize(store.get(key));
      store.delete(key);
      this.currentBytes = Math.max(0, this.currentBytes - existingSize);
    }
  }

  async getAll<T>(storeName: string): Promise<readonly T[]> {
    if (this.failureHook) {
      const err = this.failureHook(storeName, 'getAll');
      if (err) throw err;
    }
    const store = this.getStore(storeName);
    return Array.from(store.values()).map(
      (v) => JSON.parse(JSON.stringify(v)) as T
    );
  }

  async transaction<R>(
    storeNames: readonly string[],
    mode: 'readonly' | 'readwrite',
    operation: (tx: TransactionContext) => Promise<R>
  ): Promise<R> {
    // Snapshot stores involved in transaction for atomic rollback
    const snapshots = new Map<string, Map<string, unknown>>();
    const initialBytes = this.currentBytes;

    for (const name of storeNames) {
      const original = this.getStore(name);
      snapshots.set(name, new Map(original));
    }

    const txContext: TransactionContext = {
      get: (s, k) => this.get(s, k),
      put: (s, k, v) => this.put(s, k, v),
      delete: (s, k) => this.delete(s, k),
      getAll: (s) => this.getAll(s),
    };

    try {
      const result = await operation(txContext);
      return result;
    } catch (err: unknown) {
      // Rollback snapshots on any transaction failure
      if (mode === 'readwrite') {
        for (const [name, snapshot] of snapshots.entries()) {
          this.stores.set(name, snapshot);
        }
        this.currentBytes = initialBytes;
      }
      throw err;
    }
  }

  async clear(storeName?: string): Promise<void> {
    if (storeName) {
      this.stores.delete(storeName);
    } else {
      this.stores.clear();
      this.currentBytes = 0;
    }
  }

  async close(): Promise<void> {
    // No-op for in-memory driver
  }
}

/**
 * Standard IndexedDB storage driver for browser environments.
 */
export class IndexedDBStorageDriver implements StorageDriver {
  private dbPromise: Promise<IDBDatabase> | null = null;
  private readonly dbName: string;

  constructor(options?: { dbName?: string }) {
    this.dbName = options?.dbName ?? 'grade9_runtime_storage';
  }

  private openDB(): Promise<IDBDatabase> {
    if (this.dbPromise) return this.dbPromise;

    this.dbPromise = new Promise((resolve, reject) => {
      if (typeof indexedDB === 'undefined') {
        reject(new StorageError('DATABASE_UNAVAILABLE', 'IndexedDB is not available in current environment'));
        return;
      }

      const req = indexedDB.open(this.dbName, 1);

      req.onupgradeneeded = (e) => {
        const db = req.result;
        if (!db.objectStoreNames.contains('drafts')) {
          db.createObjectStore('drafts', { keyPath: 'sessionId' });
        }
        if (!db.objectStoreNames.contains('attempts')) {
          const attemptStore = db.createObjectStore('attempts', { keyPath: 'id' });
          attemptStore.createIndex('sessionId', 'sessionId', { unique: false });
        }
        if (!db.objectStoreNames.contains('artifacts')) {
          db.createObjectStore('artifacts', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('sessions')) {
          db.createObjectStore('sessions', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('meta')) {
          db.createObjectStore('meta');
        }
      };

      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(new StorageError('DATABASE_OPEN_FAILED', req.error?.message ?? 'Failed to open IndexedDB'));
    });

    return this.dbPromise;
  }

  async get<T>(storeName: string, key: string): Promise<T | undefined> {
    const db = await this.openDB();
    return new Promise((resolve, reject) => {
      try {
        const tx = db.transaction(storeName, 'readonly');
        const store = tx.objectStore(storeName);
        const req = store.get(key);
        req.onsuccess = () => resolve(req.result as T | undefined);
        req.onerror = () => reject(new StorageError('TRANSACTION_FAILED', req.error?.message ?? 'Get failed'));
      } catch (err) {
        reject(err);
      }
    });
  }

  async put<T>(storeName: string, key: string, value: T): Promise<void> {
    const db = await this.openDB();
    return new Promise((resolve, reject) => {
      try {
        const tx = db.transaction(storeName, 'readwrite');
        const store = tx.objectStore(storeName);
        // If keyPath is defined on store, put without second key argument
        const req = store.keyPath ? store.put(value) : store.put(value, key);

        tx.oncomplete = () => resolve();
        tx.onerror = () => {
          const errName = tx.error?.name;
          if (errName === 'QuotaExceededError') {
            reject(new StorageError('QUOTA_EXCEEDED', 'IndexedDB quota exceeded'));
          } else {
            reject(new StorageError('TRANSACTION_ABORTED', tx.error?.message ?? 'Transaction aborted'));
          }
        };
      } catch (err) {
        reject(err);
      }
    });
  }

  async delete(storeName: string, key: string): Promise<void> {
    const db = await this.openDB();
    return new Promise((resolve, reject) => {
      try {
        const tx = db.transaction(storeName, 'readwrite');
        const store = tx.objectStore(storeName);
        store.delete(key);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(new StorageError('TRANSACTION_FAILED', tx.error?.message ?? 'Delete failed'));
      } catch (err) {
        reject(err);
      }
    });
  }

  async getAll<T>(storeName: string): Promise<readonly T[]> {
    const db = await this.openDB();
    return new Promise((resolve, reject) => {
      try {
        const tx = db.transaction(storeName, 'readonly');
        const store = tx.objectStore(storeName);
        const req = store.getAll();
        req.onsuccess = () => resolve((req.result ?? []) as T[]);
        req.onerror = () => reject(new StorageError('TRANSACTION_FAILED', req.error?.message ?? 'GetAll failed'));
      } catch (err) {
        reject(err);
      }
    });
  }

  async transaction<R>(
    storeNames: readonly string[],
    mode: 'readonly' | 'readwrite',
    operation: (tx: TransactionContext) => Promise<R>
  ): Promise<R> {
    const db = await this.openDB();
    return new Promise((resolve, reject) => {
      try {
        const tx = db.transaction(storeNames as string[], mode);
        const txContext: TransactionContext = {
          get: <T>(s: string, k: string) =>
            new Promise((res, rej) => {
              const req = tx.objectStore(s).get(k);
              req.onsuccess = () => res(req.result as T | undefined);
              req.onerror = () => rej(req.error);
            }),
          put: <T>(s: string, k: string, v: T) =>
            new Promise((res, rej) => {
              const store = tx.objectStore(s);
              const req = store.keyPath ? store.put(v) : store.put(v, k);
              req.onsuccess = () => res();
              req.onerror = () => rej(req.error);
            }),
          delete: (s: string, k: string) =>
            new Promise((res, rej) => {
              const req = tx.objectStore(s).delete(k);
              req.onsuccess = () => res();
              req.onerror = () => rej(req.error);
            }),
          getAll: <T>(s: string) =>
            new Promise((res, rej) => {
              const req = tx.objectStore(s).getAll();
              req.onsuccess = () => res((req.result ?? []) as T[]);
              req.onerror = () => rej(req.error);
            }),
        };

        operation(txContext)
          .then((res) => {
            tx.oncomplete = () => resolve(res);
          })
          .catch((err) => {
            try {
              tx.abort();
            } catch {
              // ignore
            }
            reject(err);
          });

        tx.onerror = () => {
          if (tx.error?.name === 'QuotaExceededError') {
            reject(new StorageError('QUOTA_EXCEEDED', 'IndexedDB quota exceeded'));
          } else {
            reject(new StorageError('TRANSACTION_ABORTED', tx.error?.message ?? 'Transaction aborted'));
          }
        };
      } catch (err) {
        reject(err);
      }
    });
  }

  async clear(storeName?: string): Promise<void> {
    const db = await this.openDB();
    const stores = storeName ? [storeName] : Array.from(db.objectStoreNames);
    const tx = db.transaction(stores, 'readwrite');
    for (const s of stores) {
      tx.objectStore(s).clear();
    }
    return new Promise((resolve, reject) => {
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }

  async close(): Promise<void> {
    if (this.dbPromise) {
      const db = await this.dbPromise;
      db.close();
      this.dbPromise = null;
    }
  }
}

/**
 * Storage driver factory providing transparent IndexedDB or in-memory fallback.
 */
export function createStorageDriver(options?: StorageDriverOptions): StorageDriver {
  if (options?.preferMemory || typeof indexedDB === 'undefined') {
    return new MemoryStorageDriver({ quotaBytes: options?.quotaBytes });
  }
  return new IndexedDBStorageDriver({ dbName: options?.dbName });
}
