/** Durable per-paper session selection. Retakes never erase prior drafts or attempts.
 * The base (legacy) session stays readable; each explicit retake chooses a new
 * generation with its own session ID and attempt ID. A small atomic pointer is
 * the only mutable record shared between generations.
 */
import type { StorageDriver } from './storage.ts';

const POINTER_STORE = 'paper_active_sessions';

interface PaperPointer {
  readonly generation: number;
  readonly sessionId: string;
}

export function paperBaseSessionId(releaseId: string, paperId: string, learnerId: string): string {
  if (![releaseId, paperId, learnerId].every(v => typeof v === 'string' && v.trim().length > 0)) {
    throw Error('PAPER_SESSION_ID_INVALID');
  }
  return `ses:${releaseId}:${paperId}:${learnerId}`;
}

function validPointer(rootId: string, value: unknown): value is PaperPointer {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const p = value as Record<string, unknown>;
  return typeof p.generation === 'number' && Number.isSafeInteger(p.generation) && p.generation > 0 &&
    p.sessionId === `${rootId}:retake:${p.generation}`;
}

export async function activePaperSessionId(driver: StorageDriver, rootId: string): Promise<string> {
  const pointer = await driver.get<PaperPointer>(POINTER_STORE, rootId);
  if (pointer === undefined) return rootId; // Existing legacy attempt, no migration loss.
  if (!validPointer(rootId, pointer)) throw Error('PAPER_SESSION_POINTER_CORRUPT');
  return pointer.sessionId;
}

export async function beginFreshPaperAttempt(driver: StorageDriver, rootId: string): Promise<string> {
  return driver.transaction([POINTER_STORE], 'readwrite', async tx => {
    const prior = await tx.get<PaperPointer>(POINTER_STORE, rootId);
    if (prior !== undefined && !validPointer(rootId, prior)) throw Error('PAPER_SESSION_POINTER_CORRUPT');
    const nextGeneration = (prior?.generation ?? 0) + 1;
    if (!Number.isSafeInteger(nextGeneration)) throw Error('PAPER_SESSION_GENERATION_EXHAUSTED');
    const nextId = `${rootId}:retake:${nextGeneration}`;
    await tx.put(POINTER_STORE, rootId, {generation: nextGeneration, sessionId: nextId} satisfies PaperPointer);
    return nextId;
  });
}
