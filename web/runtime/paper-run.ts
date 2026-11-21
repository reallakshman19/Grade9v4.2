/** Persistent exam-run allocation: archive instead of deleting earlier attempts. */
import type {Ref,TaskRef,Session as SessionRecord} from './types.ts';
import type {StorageDriver} from './storage.ts';
import {sameRef} from './loader.ts';

interface ActiveRun {
  readonly schema: 'g9-paper-active-run/1';
  readonly sequence: number;
  readonly sessionId: string;
}
interface Request {
  readonly driver: StorageDriver;
  readonly legacySessionId: string;
  readonly releaseId: string;
  readonly paper: Ref<'PAPER'>;
  readonly task: TaskRef;
  readonly durationSeconds: number;
  readonly returnRoute: string;
  readonly forceNewAttempt: boolean;
}

/** Atomic run allocation ensures retakes never overwrite exam evidence. */
export async function acquireAuthorizedPaperRun(o:Request):Promise<{session:SessionRecord;attemptId:string}>{
  if(!o.legacySessionId||!Number.isSafeInteger(o.durationSeconds)||o.durationSeconds<1||o.durationSeconds>86400)throw Error('PAPER_RUN_INVALID');
  return o.driver.transaction(['paper_active_runs','sessions'],'readwrite',async tx=>{
    const ptr=await tx.get<ActiveRun>('paper_active_runs',o.legacySessionId);
    if(ptr&&(ptr.schema!=='g9-paper-active-run/1'||!Number.isSafeInteger(ptr.sequence)||ptr.sequence<1||ptr.sessionId!==`${o.legacySessionId}:run:${ptr.sequence}`))throw Error('PAPER_RUN_POINTER_INVALID');
    let sessionId=ptr?.sessionId??o.legacySessionId;
    let ses=await tx.get<SessionRecord>('sessions',sessionId);
    const expiry=ses?.deadlineAt?Date.parse(ses.deadlineAt):NaN;
    const incompatible=!!ses&&(
      ses.id!==sessionId||ses.releaseId!==o.releaseId||ses.mode!=='SIMULATED_EXAM'||
      !sameRef(ses.item,o.task)||!ses.origin||!sameRef(ses.origin,o.paper)||
      ses.contentRevision!==`rev:${o.task.revision}`||!Array.isArray(ses.attemptIds)||
      !Number.isFinite(expiry)||(ses.attemptIds.length===0&&Date.now()>=expiry)
    );
    if(o.forceNewAttempt||incompatible||(!!ptr&&!ses)){
      let next=ptr?.sequence??0;
      do {
        if(next>=Number.MAX_SAFE_INTEGER-1)throw Error('PAPER_RUN_EXHAUSTED');
        sessionId=`${o.legacySessionId}:run:${++next}`;
      } while(await tx.get('sessions',sessionId));
      ses=undefined;
      await tx.put<ActiveRun>('paper_active_runs',o.legacySessionId,{schema:'g9-paper-active-run/1',sequence:next,sessionId});
    }
    if(!ses){
      ses={
        id:sessionId,releaseId:o.releaseId,item:o.task,mode:'SIMULATED_EXAM',
        contentRevision:`rev:${o.task.revision}`,origin:o.paper,returnRoute:o.returnRoute,
        cursor:0,attemptIds:[],draftId:null,
        deadlineAt:new Date(Date.now()+o.durationSeconds*1000).toISOString(),
      };
      await tx.put('sessions',sessionId,ses);
    }
    return {session:ses,attemptId:`att:${sessionId}:1`};
  });
}
