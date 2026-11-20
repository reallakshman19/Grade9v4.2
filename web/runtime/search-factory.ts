/**
 * web/runtime/search-factory.ts
 * A35 browser search engine factory binding.
 * Constructs SearchEngine instance using authenticated DEMO release manifest and wire shards.
 */

import { SearchEngine, type SearchOpen, type SearchPins } from './search.ts';
import { ManifestLoader } from './loader.ts';
import wireData from './diagnostic-search-wire.json';

export interface WirePayload {
  readonly release: string;
  readonly manifest: string;
  readonly shards: Record<string, string>;
  readonly pins: SearchPins;
}

export function createDiagnosticSearchEngineFactory(
  overrideWire?: WirePayload,
  liveCheck?: (pins: SearchPins) => Promise<boolean>
): () => Promise<SearchEngine> {
  const wire: WirePayload = overrideWire || (wireData as unknown as WirePayload);

  return async (): Promise<SearchEngine> => {
    const loader = new ManifestLoader([
      { releaseId: wire.pins.releaseId, digest: wire.pins.releaseDigest },
    ]);
    const release = await loader.loadFromData(wire.release, wire.pins.releaseDigest);

    const openOptions: SearchOpen = {
      pins: wire.pins,
      releaseLoader: loader,
      release,
      manifestBytes: wire.manifest,
      loadShard: async (meta: { shard_id: string }) => {
        const shard = wire.shards[meta.shard_id];
        if (!shard) throw new Error(`MISSING_SHARD: ${meta.shard_id}`);
        return shard;
      },
      live: liveCheck || (async () => true),
    };

    return await SearchEngine.open(openOptions);
  };
}
