/**
 * web/runtime/search-worker.ts
 * Workpack A35: Background Web Worker for universal search index execution.
 *
 * Provides off-main-thread search indexing, scoring, and facet filtering
 * ensuring main thread UI interactivity meets the p95 <= 200ms performance contract.
 *
 * No academic approval inferred from software validation.
 * academic_admission: HOLD
 * release_authority: NONE
 */

import {
  SearchEngine,
  type SearchManifest,
  type SearchShardMeta,
  type SearchItem,
  type SearchFacetCriteria,
  type SearchResultItem,
  StaleShardError,
} from './search.ts';

export type WorkerInMessage =
  | { type: 'INIT'; payload: { manifest: SearchManifest } }
  | { type: 'LOAD_SHARD'; payload: { shardMeta: SearchShardMeta; items: SearchItem[]; digest: string } }
  | { type: 'SEARCH'; payload: { query: string; facets?: SearchFacetCriteria; limit?: number; offset?: number } }
  | { type: 'WITHDRAW'; payload: { itemId: string } }
  | { type: 'RESTORE'; payload: { itemId: string } };

export type WorkerOutMessage =
  | { type: 'READY'; payload: { releaseId: string; totalLoaded: number } }
  | { type: 'SHARD_LOADED'; payload: { shardId: string; totalItems: number } }
  | {
      type: 'SEARCH_RESULTS';
      payload: {
        results: readonly SearchResultItem[];
        totalMatches: number;
        suggestion: string | null;
        executionTimeMs: number;
      };
    }
  | { type: 'ERROR'; error: string; isStaleShard: boolean };

export class SearchWorkerContext {
  private engine: SearchEngine | null = null;

  public handleMessage(msg: WorkerInMessage): WorkerOutMessage {
    try {
      switch (msg.type) {
        case 'INIT': {
          this.engine = new SearchEngine(msg.payload.manifest);
          return {
            type: 'READY',
            payload: {
              releaseId: msg.payload.manifest.release_id,
              totalLoaded: 0,
            },
          };
        }
        case 'LOAD_SHARD': {
          if (!this.engine) {
            throw new Error('Search worker not initialized. Send INIT message first.');
          }
          this.engine.loadShard(
            msg.payload.shardMeta,
            msg.payload.items,
            msg.payload.digest
          );
          return {
            type: 'SHARD_LOADED',
            payload: {
              shardId: msg.payload.shardMeta.shard_id,
              totalItems: this.engine.getAllLoadedItems().length,
            },
          };
        }
        case 'SEARCH': {
          if (!this.engine) {
            throw new Error('Search worker not initialized.');
          }
          const res = this.engine.query(msg.payload.query, {
            facets: msg.payload.facets,
            limit: msg.payload.limit,
            offset: msg.payload.offset,
          });
          return {
            type: 'SEARCH_RESULTS',
            payload: {
              results: res.results,
              totalMatches: res.totalMatches,
              suggestion: res.suggestion,
              executionTimeMs: res.executionTimeMs,
            },
          };
        }
        case 'WITHDRAW': {
          if (!this.engine) throw new Error('Search worker not initialized.');
          this.engine.withdrawItem(msg.payload.itemId);
          return {
            type: 'READY',
            payload: {
              releaseId: this.engine.getManifest()?.release_id || '',
              totalLoaded: this.engine.getAllLoadedItems().length,
            },
          };
        }
        case 'RESTORE': {
          if (!this.engine) throw new Error('Search worker not initialized.');
          this.engine.restoreItem(msg.payload.itemId);
          return {
            type: 'READY',
            payload: {
              releaseId: this.engine.getManifest()?.release_id || '',
              totalLoaded: this.engine.getAllLoadedItems().length,
            },
          };
        }
        default:
          throw new Error(`Unknown message type: ${(msg as { type: string }).type}`);
      }
    } catch (err: unknown) {
      const isStale = err instanceof StaleShardError;
      return {
        type: 'ERROR',
        error: err instanceof Error ? err.message : String(err),
        isStaleShard: isStale,
      };
    }
  }
}

// In dedicated worker thread environment, wire postMessage
declare const self: {
  onmessage: ((e: { data: WorkerInMessage }) => void) | null;
  postMessage: (data: WorkerOutMessage) => void;
};

if (typeof self !== 'undefined' && typeof self.postMessage === 'function') {
  const ctx = new SearchWorkerContext();
  self.onmessage = (event: { data: WorkerInMessage }) => {
    const response = ctx.handleMessage(event.data);
    self.postMessage(response);
  };
}
