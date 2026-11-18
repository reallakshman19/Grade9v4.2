// A19 R2 correction of PR #46: asynchronous, durable-state controller.
// Original mutable timer/attempt log is not an authority. An exam uses the stored immutable deadline.
import type {Attempt,Session as DurableSession,Ref,SessionMode} from './types.ts';
import type {StorageDriver} from './storage.ts';
import {DefaultProgressStore} from './progress.ts';
import {sameRef} from './loader.ts';
import {submissionPermitted,disclosurePolicy,type DisclosureKind,type PolicyReport} from './policy.ts';
export type {SessionMode} from './types.ts';
export interface SessionConfig{readonly sessionId:string;readonly releaseId:string;readonly item:Ref;readonly mode:SessionMode}
export interface SessionAuthority{
  liveRevision(session:DurableSession):Promise<string>;
  reviewedDisclosure(session:DurableSession,attempt:Attempt|null,kind:DisclosureKind,requested:Ref):Promise<boolean>;
}
export class SessionError extends Error{readonly code:string;constructor(code:string){super(code);this.name='SessionError';this.code=code;}}
export class Session {
  private readonly config:SessionConfig;private readonly driver:StorageDriver;private readonly progress:DefaultProgressStore;private readonly authority:SessionAuthority;
  constructor(config:SessionConfig,driver:StorageDriver,progress:DefaultProgressStore,authority:SessionAuthority){this.config=structuredClone(config);this.driver=driver;this.progress=progress;this.authority=authority;}
  async snapshot():Promise<DurableSession>{
    const s=await this.driver.get<DurableSession>('sessions',this.config.sessionId);
    if(!s||s.releaseId!==this.config.releaseId||s.mode!==this.config.mode||!sameRef(s.item,this.config.item))throw new SessionError('SESSION_IDENTITY_MISMATCH');
    return s;
  }
  async appendAttempt(attempt:Attempt):Promise<Attempt>{
    const s=await this.snapshot();
    if(attempt.sessionId!==s.id||attempt.releaseId!==s.releaseId||!sameRef(attempt.item,s.item)||attempt.cognitive!==null)throw new SessionError('ATTEMPT_IDENTITY_MISMATCH');
    const revision=await this.authority.liveRevision(s);
    if(!submissionPermitted(s,revision))throw new SessionError('SUBMISSION_BLOCKED');
    await this.progress.appendQualifiedAttempt(attempt);
    const committed=await this.progress.committedAttempt(s.id,attempt.id);
    if(!committed)throw new SessionError('COMMIT_NOT_QUALIFIED');
    return committed;
  }
  async disclosure(kind:DisclosureKind,attemptId:string,requested:Ref):Promise<PolicyReport>{
    const s=await this.snapshot(),a=await this.progress.committedAttempt(s.id,attemptId);
    if(!a||s.mode==='SIMULATED_EXAM')return disclosurePolicy(s,null,kind,'',requested,false);
    return disclosurePolicy(s,a,kind,await this.authority.liveRevision(s),requested,await this.authority.reviewedDisclosure(s,a,kind,requested));
  }
  async remainingMs():Promise<number|null>{const s=await this.snapshot();return s.deadlineAt?Math.max(0,Date.parse(s.deadlineAt)-Date.now()):null;}
  async recovery():Promise<{origin:Ref|null;returnRoute:string|null;cursor:number}>{const s=await this.snapshot();return {origin:s.origin,returnRoute:s.returnRoute??null,cursor:s.cursor};}
}
export function createSession(config:SessionConfig,driver:StorageDriver,progress:DefaultProgressStore,authority:SessionAuthority):Session{return new Session(config,driver,progress,authority);}
