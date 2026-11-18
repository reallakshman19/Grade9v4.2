// Storage Driver and Transaction abstractions for Grade9 Platform Runtime.
// Provides IndexedDB persistence with safe in-memory fallback for headless/CI runtimes.
// Engineering validation: "No academic approval inferred from software validation."

import type { Response, WorkArtifact, Session, Attempt, CognitiveDraftLineage } from './types.ts';

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
  readonly cognitive?:CognitiveDraftLineage|null;
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

// One serializable transaction queue for memory storage; no references escape.
export class MemoryStorageDriver implements StorageDriver {
  private stores=new Map<string,Map<string,unknown>>();
  private tail:Promise<void>=Promise.resolve();
  private quotaBytes:number;
  private failureHook:((s:string,a:string)=>StorageError|null)|null=null;
  constructor(options?:{quotaBytes?:number}){this.quotaBytes=options?.quotaBytes??Infinity;}
  setQuota(bytes:number):void{this.quotaBytes=bytes;}
  setFailureHook(hook:((s:string,a:string)=>StorageError|null)|null):void{this.failureHook=hook;}
  async transaction<R>(names:readonly string[],mode:'readonly'|'readwrite',operation:(tx:TransactionContext)=>Promise<R>):Promise<R>{
    const before=this.tail;let unlock!:()=>void;this.tail=new Promise<void>(r=>{unlock=r;});await before;
    try{
      const draft=new Map([...this.stores].map(([k,v])=>[k,new Map(v)]));
      let active=true;
      const store=(s:string,a:string,write=false)=>{if(!active||!names.includes(s)||write&&mode!=='readwrite')throw new StorageError('TRANSACTION_SCOPE','Invalid transaction operation');const err=this.failureHook?.(s,a);if(err)throw err;let m=draft.get(s);if(!m){m=new Map();draft.set(s,m);}return m;};
      const tx:TransactionContext={
        get:async <T>(s:string,k:string)=>structuredClone(store(s,'get').get(k)) as T|undefined,
        getAll:async <T>(s:string)=>[...store(s,'getAll').values()].map(v=>structuredClone(v) as T),
        put:async <T>(s:string,k:string,v:T)=>{store(s,'put',true).set(k,structuredClone(v));const bytes=[...draft.values()].flatMap(m=>[...m.values()]).reduce<number>((sum,v)=>sum+new TextEncoder().encode(JSON.stringify(v)).length,0);if(bytes>this.quotaBytes)throw new StorageError('QUOTA_EXCEEDED','Storage quota exceeded');},
        delete:async(s,k)=>{store(s,'delete',true).delete(k);}
      };
      try{const result=await operation(tx);if(mode==='readwrite')this.stores=draft;return result;}finally{active=false;}
    }finally{unlock();}
  }
  get<T>(s:string,k:string){return this.transaction([s],'readonly',tx=>tx.get<T>(s,k));}
  put<T>(s:string,k:string,v:T){return this.transaction([s],'readwrite',tx=>tx.put(s,k,v));}
  delete(s:string,k:string){return this.transaction([s],'readwrite',tx=>tx.delete(s,k));}
  getAll<T>(s:string){return this.transaction([s],'readonly',tx=>tx.getAll<T>(s));}
  async clear(s?:string){const before=this.tail;let unlock!:()=>void;this.tail=new Promise<void>(r=>{unlock=r;});await before;try{if(s)this.stores.delete(s);else this.stores.clear();}finally{unlock();}}
  async close(){}
}
// IndexedDB uses a composite key [logical store, key], so dynamic cognitive
// journeys share one physical store. Version 2 migrates v1 stores without loss.
export class IndexedDBStorageDriver implements StorageDriver {
  private dbPromise:Promise<IDBDatabase>|null=null;
  private readonly dbName:string;
  constructor(options?:{dbName?:string}){this.dbName=options?.dbName??'grade9_runtime_storage';}
  private openDB():Promise<IDBDatabase>{
    if(this.dbPromise)return this.dbPromise;
    this.dbPromise=new Promise((resolve,reject)=>{
      const req=indexedDB.open(this.dbName,2);
      req.onupgradeneeded=()=>{
        const db=req.result;const tr=req.transaction!;
        const records=db.createObjectStore('records');
        for(const name of Array.from(db.objectStoreNames).filter(n=>n!=='records')){
          const cursor=tr.objectStore(name).openCursor();
          cursor.onsuccess=()=>{const c=cursor.result;if(c){records.put(c.value,[name,String(c.primaryKey)]);c.continue();}};
        }
      };
      req.onsuccess=()=>{const db=req.result;db.onversionchange=()=>{db.close();this.dbPromise=null;};resolve(db);};
      req.onerror=()=>{this.dbPromise=null;reject(new StorageError('DATABASE_OPEN_FAILED',req.error?.message??'Open failed'));};
      req.onblocked=()=>{reject(new StorageError('DATABASE_BLOCKED','Close old database connections'));};
    });return this.dbPromise;
  }
  async transaction<R>(names:readonly string[],mode:'readonly'|'readwrite',operation:(tx:TransactionContext)=>Promise<R>):Promise<R>{
    const db=await this.openDB();
    return new Promise<R>((resolve,reject)=>{
      const tr=db.transaction('records',mode);const records=tr.objectStore('records');
      let done=false, result:R, failure:unknown;
      const fail=(e:unknown)=>{failure=e;done=true;try{tr.abort();}catch{};};
      tr.onabort=()=>reject(failure??new StorageError(tr.error?.name==='QuotaExceededError'?'QUOTA_EXCEEDED':'TRANSACTION_ABORTED',tr.error?.message??'Transaction aborted'));
      tr.onerror=()=>{};tr.oncomplete=()=>{if(done&&!failure)resolve(result);else reject(failure??new StorageError('TRANSACTION_ABORTED','Transaction completed prematurely'));};
      const queued:Array<()=>void>=[];
      const req=<T>(factory:()=>IDBRequest<T>)=>new Promise<T>((res,rej)=>{queued.push(()=>{try{const r=factory();r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error);}catch(e){rej(e);}});});
      const key=(s:string,k:string,write=false)=>{if(done||!names.includes(s)||write&&mode!=='readwrite')throw new StorageError('TRANSACTION_SCOPE','Invalid transaction operation');return [s,k];};
      const range=(s:string)=>{key(s,'');return IDBKeyRange.bound([s],[s,[]]);};
      const ctx:TransactionContext={
        get:async <T>(s:string,k:string)=>await req(()=>records.get(key(s,k))) as T|undefined,
        getAll:async <T>(s:string)=>await req(()=>records.getAll(range(s))) as T[],
        put:async <T>(s:string,k:string,v:T)=>{await req(()=>records.put(v,key(s,k,true)));},
        delete:async(s,k)=>{await req(()=>records.delete(key(s,k,true)));},
      };
      // Keep the transaction active across WebCrypto and other awaited tasks.
      const keepAlive=()=>{if(done)return;for(const fn of queued.splice(0))fn();const q=records.get(['__transaction_keepalive__','']);q.onsuccess=keepAlive;};
      keepAlive();
      Promise.resolve().then(()=>operation(ctx)).then(v=>{result=v;done=true;},fail);
    });
  }
  get<T>(s:string,k:string){return this.transaction([s],'readonly',tx=>tx.get<T>(s,k));}
  put<T>(s:string,k:string,v:T){return this.transaction([s],'readwrite',tx=>tx.put(s,k,v));}
  delete(s:string,k:string){return this.transaction([s],'readwrite',tx=>tx.delete(s,k));}
  getAll<T>(s:string){return this.transaction([s],'readonly',tx=>tx.getAll<T>(s));}
  async clear(s?:string){const db=await this.openDB();await new Promise<void>((resolve,reject)=>{const tx=db.transaction('records','readwrite');const store=tx.objectStore('records');if(s)store.delete(IDBKeyRange.bound([s],[s,[]]));else store.clear();tx.oncomplete=()=>resolve();tx.onabort=()=>reject(tx.error);});}
  async close(){if(this.dbPromise){(await this.dbPromise).close();this.dbPromise=null;}}
}
export function createStorageDriver(options?:StorageDriverOptions):StorageDriver{
  if(options?.preferMemory||typeof window==='undefined'&&typeof indexedDB==='undefined')return new MemoryStorageDriver({quotaBytes:options?.quotaBytes});
  if(typeof indexedDB==='undefined')throw new StorageError('DATABASE_UNAVAILABLE','Persistent browser storage is unavailable');
  return new IndexedDBStorageDriver({dbName:options?.dbName});
}
