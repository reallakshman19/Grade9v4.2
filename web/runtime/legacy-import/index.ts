// A72 R2: user-exported legacy history only; never live attempts or mastery.
import type {StorageDriver} from '../storage.ts';
import type {Ref} from '../types.ts';
import {canonicalJson,computeSha256} from '../loader.ts';
import {findDuplicateKeyInJson,validateResponse} from '../response.ts';
export interface LegacyAuthority{
  authorize(rawSha256:string,origin:string):Promise<boolean>;
  resolveItem(id:string,revision:number):Promise<{ref:Ref<'QUESTION'|'FRESH_TASK'>;optionIds:readonly string[]}|null>;
}
export interface LegacyHistoryRow{readonly sourceOrigin:string;readonly sourceId:string;readonly sourceSessionId:string;readonly item:Ref;readonly response:unknown;readonly submittedAt:string;readonly originalDigest:string;readonly grade:{readonly status:'REVIEW_PENDING';readonly points:null};readonly protectedEvidence:false;readonly masteryEligible:false}
export interface LegacyDryRun{readonly rawSha256:string;readonly origin:string;readonly deviceTrust:'UNKNOWN_DEVICE';readonly disposition:'MAPPED_HISTORY'|'QUARANTINED';readonly reasons:readonly string[];readonly rows:readonly LegacyHistoryRow[]}
const nonblank=(v:unknown):v is string=>typeof v==='string'&&v.trim().length>0;
const obj=(v:unknown):v is Record<string,unknown>=>!!v&&typeof v==='object'&&!Array.isArray(v);
const timestamp=(v:unknown):v is string=>typeof v==='string'&&/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.\d+)?(?:Z|\+00:00)$/.test(v)&&Number.isFinite(Date.parse(v));
export class LegacyStateImporter{
  private readonly driver:StorageDriver;private readonly authority:LegacyAuthority;
  constructor(driver:StorageDriver,authority:LegacyAuthority){this.driver=driver;this.authority=authority;}
  async dryRun(raw:string):Promise<LegacyDryRun>{
    if(findDuplicateKeyInJson(raw))throw Error('DUPLICATE_LEGACY_KEY');
    const value:unknown=JSON.parse(raw);
    if(!obj(value)||value.schema_version!=='g9-legacy-import/1.0'||!nonblank(value.origin)||!timestamp(value.exportedAt))throw Error('UNSUPPORTED_LEGACY_ENVELOPE');
    const rawSha256=await computeSha256(raw),origin=value.origin;
    if(!await this.authority.authorize(rawSha256,origin))throw Error('LEGACY_EXPORT_NOT_AUTHORIZED');
    const reasons:string[]=[],rows:LegacyHistoryRow[]=[];
    const sessions=Array.isArray(value.sessions)?value.sessions:[],attempts=Array.isArray(value.attempts)?value.attempts:[];
    if(!Array.isArray(value.sessions)||!Array.isArray(value.attempts))reasons.push('MISSING_SOURCE_COLLECTION');
    const sessionIds=new Set<string>(),attemptIds=new Set<string>();
    for(const s of sessions){if(!obj(s)||!nonblank(s.id)||!timestamp(s.startedAt)||sessionIds.has(s.id))reasons.push('UNVERIFIABLE_SESSION');else sessionIds.add(s.id);}
    for(const a of attempts){
      if(!obj(a)||!nonblank(a.id)||!nonblank(a.sessionId)||!sessionIds.has(a.sessionId)||!nonblank(a.itemId)||!Number.isSafeInteger(a.revision)||Number(a.revision)<1||!timestamp(a.submittedAt)||attemptIds.has(a.id)){reasons.push('UNVERIFIABLE_ATTEMPT');continue;}
      attemptIds.add(a.id);
      const item=await this.authority.resolveItem(a.itemId,Number(a.revision));
      if(!item||item.ref.id!==a.itemId||item.ref.revision!==a.revision){reasons.push('UNRESOLVED_EXACT_ITEM');continue;}
      try{
        const response=validateResponse(a.response);
        if(response.kind==='SINGLE_CHOICE'&&!item.optionIds.includes(response.value)||response.kind==='MULTIPLE_CHOICE'&&!response.value.every(id=>item.optionIds.includes(id)))throw Error('INVALID_OPTION');
        rows.push({sourceOrigin:origin,sourceId:a.id,sourceSessionId:a.sessionId,item:item.ref,response,submittedAt:a.submittedAt,originalDigest:await computeSha256(canonicalJson(a)),grade:{status:'REVIEW_PENDING',points:null},protectedEvidence:false,masteryEligible:false});
      }catch{reasons.push('INVALID_OR_UNMAPPED_RESPONSE');}
    }
    return {rawSha256,origin,deviceTrust:'UNKNOWN_DEVICE',disposition:reasons.length?'QUARANTINED':'MAPPED_HISTORY',reasons,rows:reasons.length?[]:rows};
  }
  async importBundle(raw:string):Promise<LegacyDryRun>{
    const report=await this.dryRun(raw);
    return this.driver.transaction(['legacy_raw_exports','legacy_history'],'readwrite',async tx=>{
      const previous=await tx.get<{raw:string;report:LegacyDryRun}>('legacy_raw_exports',report.rawSha256);
      if(previous){if(previous.raw!==raw||canonicalJson(previous.report)!==canonicalJson(report))throw Error('LEGACY_CONFLICT');return previous.report;}
      for(const row of report.rows){
        const id=await computeSha256(canonicalJson([row.sourceOrigin,row.sourceId]));
        const old=await tx.get<LegacyHistoryRow>('legacy_history',id);
        if(old&&canonicalJson(old)!==canonicalJson(row))throw Error('LEGACY_ATTEMPT_CONFLICT');
        if(!old)await tx.put('legacy_history',id,row);
      }
      await tx.put('legacy_raw_exports',report.rawSha256,{raw,report});return report;
    });
  }
}
