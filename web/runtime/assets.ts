/** A25: local byte integrity, not release or academic authority. */
export type AssetIntegrityStatus = 'VERIFIED' | 'MISSING_REQUIRED' | 'MISSING_OPTIONAL' | 'CORRUPT_HASH_MISMATCH';
export interface AssetDescriptor {
  readonly id: string;
  readonly mimeType: string;
  readonly mandatory: boolean;
  readonly expectedSha256: string;
  readonly localPath?: string;
  readonly dataBase64?: string;
  readonly altText?: string;
}
export interface ResolvedAsset {
  readonly descriptor: AssetDescriptor;
  readonly status: AssetIntegrityStatus;
  readonly contentDataUrl?: string;
  readonly error?: string;
}
const imageTypes = new Set(['image/png','image/jpeg','image/gif','image/webp','image/svg+xml']);
const verified = new WeakSet<ResolvedAsset>();
export function isVerifiedAsset(asset: ResolvedAsset): boolean {
  return verified.has(asset) && asset.status === 'VERIFIED';
}
function decode(raw: string, mime: string): Uint8Array {
  const prefix = 'data:' + mime + ';base64,';
  const encoded = raw.startsWith(prefix) ? raw.slice(prefix.length) : raw;
  if (!encoded.length || encoded.length > 24_000_000 || !/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(encoded)) throw new Error('Invalid base64');
  const text = atob(encoded);
  if (btoa(text) !== encoded) throw new Error('Noncanonical base64');
  return Uint8Array.from(text, c => c.charCodeAt(0));
}
function encode(bytes: Uint8Array): string {
  let out = '';
  for (let i = 0; i < bytes.length; i += 8192) out += String.fromCharCode(...bytes.subarray(i, i+8192));
  return btoa(out);
}
export class AssetRegistry {
  private assets = new Map<string, AssetDescriptor>();
  constructor(initialAssets: readonly AssetDescriptor[] = []) {
    for (const a of initialAssets) this.registerAsset(a);
  }
  registerAsset(asset: AssetDescriptor): void {
    if (!asset.id || this.assets.has(asset.id)) throw new Error('Invalid or duplicate asset identity');
    this.assets.set(asset.id, Object.freeze({...asset}));
  }
  getAsset(id: string): AssetDescriptor | undefined { return this.assets.get(id); }
  async resolveAsset(id: string, providedRawBytes?: Uint8Array | string): Promise<ResolvedAsset> {
    const descriptor = this.assets.get(id);
    if (!descriptor) return Object.freeze({descriptor:Object.freeze({id,mimeType:'image/png',mandatory:true,expectedSha256:''}),status:'MISSING_REQUIRED',error:'Asset not registered'});
    const raw = providedRawBytes ?? descriptor.dataBase64;
    if (raw === undefined) return Object.freeze({descriptor,status:descriptor.mandatory?'MISSING_REQUIRED':'MISSING_OPTIONAL'});
    try {
      if (!imageTypes.has(descriptor.mimeType) || !/^[a-f0-9]{64}$/.test(descriptor.expectedSha256)) throw new Error('Invalid asset descriptor');
      const bytes = typeof raw === 'string' ? decode(raw, descriptor.mimeType) : Uint8Array.from(raw);
      if (!bytes.length || bytes.length > 18_000_000) throw new Error('Invalid asset size');
      const hash = Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', Uint8Array.from(bytes))), v=>v.toString(16).padStart(2,'0')).join('');
      if (hash !== descriptor.expectedSha256) throw new Error('Asset digest mismatch');
      const result: ResolvedAsset = Object.freeze({descriptor,status:'VERIFIED',contentDataUrl:'data:'+descriptor.mimeType+';base64,'+encode(bytes)});
      verified.add(result);
      return result;
    } catch {
      return Object.freeze({descriptor,status:'CORRUPT_HASH_MISMATCH',error:'Asset bytes or descriptor failed integrity verification'});
    }
  }
  async verifyAllMandatoryAssets(assetIds: readonly string[]): Promise<{allAvailable:boolean;missingMandatoryIds:readonly string[]}> {
    const missing: string[] = [];
    for (const id of assetIds) {
      const res = await this.resolveAsset(id);
      if (res.status === 'MISSING_REQUIRED' || (res.descriptor.mandatory && !isVerifiedAsset(res))) missing.push(id);
    }
    return {allAvailable:missing.length===0,missingMandatoryIds:missing};
  }
}
export function createAssetRegistry(assets?: readonly AssetDescriptor[]): AssetRegistry { return new AssetRegistry(assets); }
