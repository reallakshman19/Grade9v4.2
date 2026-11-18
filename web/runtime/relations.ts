/**
 * web/runtime/relations.ts
 * A20 – Relation graph and recovery service
 *
 * Implements a bidirectional eligible edge index with:
 * - Exact origin preservation (release, session, cursor)
 * - Topic vs. sufficiency distinction (N17: topic-only edges are LABEL_ONLY)
 * - Stale relationship rejection (N16: no recovery claim on stale edge)
 * - Safe return routing with linked retry
 * - No invented routes; fail-closed on unknown/stale evidence
 *
 * No academic approval inferred from software validation.
 */

import type { Ref } from "./types.ts";

// ---------------------------------------------------------------------------
// Edge types
// ---------------------------------------------------------------------------

/**
 * Relation kind classifies the semantic strength of an edge.
 *
 * - SUFFICIENT: the target fully satisfies the prerequisite dependency.
 *   Eligible as a navigable recovery/retry route.
 * - TOPIC_ONLY: the target shares topic labels but does not constitute
 *   a sufficient dependency. N17: yields LABEL_ONLY classification,
 *   never a navigable route.
 * - PREREQUISITE: source requires target to have been completed first.
 * - EXTENSION: target extends/deepens the source concept.
 */
export type RelationKind = "SUFFICIENT" | "TOPIC_ONLY" | "PREREQUISITE" | "EXTENSION";

/**
 * Evidence quality of an edge at time of lookup.
 * CURRENT: edge evidence is fresh and consistent.
 * STALE: edge was registered but evidence is outdated or revision-mismatched.
 * UNKNOWN: edge evidence was never committed or is missing.
 */
export type EdgeEvidence = "CURRENT" | "STALE" | "UNKNOWN";

export interface RelationEdge {
  readonly edgeId: string;
  readonly sourceId: string;
  readonly targetId: string;
  readonly kind: RelationKind;
  readonly evidence: EdgeEvidence;
  /** Revision hash of the relationship entity when edge was registered. */
  readonly registeredRevision: string;
  readonly registeredAt: number;
}

// ---------------------------------------------------------------------------
// Origin anchor (exact provenance)
// ---------------------------------------------------------------------------

/**
 * Exact origin context captured at the moment a detour or recovery
 * route is opened. Must survive round-trips unchanged.
 */
export interface OriginAnchor {
  readonly releaseId: string;
  readonly sessionId: string;
  /** Cursor index at the point the detour was initiated. */
  readonly cursorIndex: number;
  /** Attempt ID of the originating question attempt, if committed. */
  readonly attemptId: string | null;
  readonly capturedAt: number;
}

// ---------------------------------------------------------------------------
// Route types
// ---------------------------------------------------------------------------

export type RouteClass =
  | "ELIGIBLE_ROUTE"   // sufficient edge, current evidence → navigable
  | "LABEL_ONLY"       // topic-only edge → N17, not a route
  | "STALE_REJECTED"   // stale or unknown evidence → N16, no recovery claim
  | "NO_ROUTE";        // no edge exists

export interface RouteResult {
  readonly routeClass: RouteClass;
  readonly targetId: string | null;
  readonly edgeId: string | null;
  readonly origin: OriginAnchor | null;
  readonly reason: string;
}

// ---------------------------------------------------------------------------
// Errors
// ---------------------------------------------------------------------------

export class RelationError extends Error {
  readonly code: string;
  constructor(code: string, message: string) {
    super(message);
    this.name = "RelationError";
    this.code = code;
  }
}

// ---------------------------------------------------------------------------
// RelationGraph
// ---------------------------------------------------------------------------

/**
 * In-memory bidirectional relation graph with eligible-edge index.
 * All writes are idempotent on edgeId; re-registration updates evidence only.
 */
export class RelationGraph {
  /** Primary store: edgeId → RelationEdge */
  private readonly edges: Map<string, RelationEdge> = new Map();

  /** Forward index: sourceId → Set<edgeId> */
  private readonly forward: Map<string, Set<string>> = new Map();

  /** Reverse index: targetId → Set<edgeId> */
  private readonly reverse: Map<string, Set<string>> = new Map();

  // -------------------------------------------------------------------------
  // Registration
  // -------------------------------------------------------------------------

  /**
   * Register or update an edge. Idempotent on edgeId.
   * Re-registration with a different registeredRevision updates the edge.
   */
  register(edge: RelationEdge): void {
    if(!edge.edgeId||!edge.sourceId||!edge.targetId||edge.sourceId===edge.targetId||!edge.registeredRevision||!Number.isFinite(edge.registeredAt)||!['SUFFICIENT','TOPIC_ONLY','PREREQUISITE','EXTENSION'].includes(edge.kind)||!['CURRENT','STALE','UNKNOWN'].includes(edge.evidence))throw new RelationError('INVALID_EDGE','Invalid edge identity');
    const prior=this.edges.get(edge.edgeId);
    if(prior&&(prior.sourceId!==edge.sourceId||prior.targetId!==edge.targetId||prior.kind!==edge.kind||prior.registeredRevision!==edge.registeredRevision))throw new RelationError('EDGE_IDENTITY_CONFLICT','Cannot replace edge identity; register a new exact revision');
    if(prior&&prior.evidence==='STALE'&&edge.evidence==='CURRENT')throw new RelationError('STALE_EDGE','Stale evidence cannot be silently reactivated');
    this.edges.set(edge.edgeId,Object.freeze({...edge}));

    // Forward index
    if (!this.forward.has(edge.sourceId)) {
      this.forward.set(edge.sourceId, new Set());
    }
    this.forward.get(edge.sourceId)!.add(edge.edgeId);

    // Reverse index
    if (!this.reverse.has(edge.targetId)) {
      this.reverse.set(edge.targetId, new Set());
    }
    this.reverse.get(edge.targetId)!.add(edge.edgeId);
  }

  /**
   * Mark an existing edge as STALE (e.g., after a content revision).
   * Throws if edgeId is not found.
   */
  markStale(edgeId: string): void {
    const edge = this.edges.get(edgeId);
    if (!edge) {
      throw new RelationError("EDGE_NOT_FOUND", `Edge ${edgeId} not found in graph`);
    }
    this.edges.set(edgeId, { ...edge, evidence: "STALE" });
  }

  // -------------------------------------------------------------------------
  // Lookup
  // -------------------------------------------------------------------------

  /**
   * Returns all edges from sourceId (forward traversal).
   */
  edgesFrom(sourceId: string): readonly RelationEdge[] {
    const ids = this.forward.get(sourceId);
    if (!ids) return [];
    return Array.from(ids).map(id => this.edges.get(id)!).filter(Boolean);
  }

  /**
   * Returns all edges to targetId (reverse traversal).
   */
  edgesTo(targetId: string): readonly RelationEdge[] {
    const ids = this.reverse.get(targetId);
    if (!ids) return [];
    return Array.from(ids).map(id => this.edges.get(id)!).filter(Boolean);
  }

  /**
   * Returns a specific edge by ID, or null.
   */
  getEdge(edgeId: string): RelationEdge | null {
    return this.edges.get(edgeId) ?? null;
  }

  // -------------------------------------------------------------------------
  // Route resolution
  // -------------------------------------------------------------------------

  /**
   * Resolve the best eligible forward route from sourceId.
   *
   * Priority:
   * 1. SUFFICIENT + CURRENT → ELIGIBLE_ROUTE
   * 2. TOPIC_ONLY + CURRENT → LABEL_ONLY (N17: label only, not a route)
   * 3. Any edge with STALE/UNKNOWN evidence → STALE_REJECTED (N16)
   * 4. No edge → NO_ROUTE
   *
   * Origin anchor is embedded in ELIGIBLE_ROUTE results for exact return.
   */
  resolveRoute(sourceId: string, origin: OriginAnchor): RouteResult {
    if(!origin.releaseId||!origin.sessionId||!Number.isSafeInteger(origin.cursorIndex)||origin.cursorIndex<0||!Number.isFinite(origin.capturedAt))throw new RelationError('INVALID_ORIGIN','Exact origin context required');
    const candidates = this.edgesFrom(sourceId);
    if (candidates.length === 0) {
      return {
        routeClass: "NO_ROUTE",
        targetId: null,
        edgeId: null,
        origin: null,
        reason: `No edges registered from ${sourceId}`,
      };
    }

    // Split by kind and evidence
    const sufficient = candidates.filter(e => e.kind === "SUFFICIENT");
    const topicOnly = candidates.filter(e => e.kind === "TOPIC_ONLY");
    const allStaleOrUnknown = candidates.every(
      e => e.evidence === "STALE" || e.evidence === "UNKNOWN"
    );

    // N16: all evidence is stale/unknown → reject, no recovery claim
    if (allStaleOrUnknown) {
      return {
        routeClass: "STALE_REJECTED",
        targetId: null,
        edgeId: null,
        origin: null,
        reason: `N16: stale relationship — all edges from ${sourceId} have stale or unknown evidence; no recovery claim`,
      };
    }

    // Check for a current SUFFICIENT edge
    const currentSufficient = sufficient.filter(e => e.evidence === "CURRENT");
    if (currentSufficient.length > 0) {
      if(currentSufficient.length!==1)return {routeClass:'NO_ROUTE',targetId:null,edgeId:null,origin:null,reason:'Ambiguous sufficient relationships; explicit reviewed route selection required'};
      const best = currentSufficient[0];
      return {
        routeClass: "ELIGIBLE_ROUTE",
        targetId: best.targetId,
        edgeId: best.edgeId,
        origin: Object.freeze({...origin}),
        reason: `Eligible route via SUFFICIENT edge ${best.edgeId}`,
      };
    }

    // N17: only topic-only current edges exist → LABEL_ONLY, not a route
    const currentTopicOnly = topicOnly.filter(e => e.evidence === "CURRENT");
    if (currentTopicOnly.length > 0) {
      return {
        routeClass: "LABEL_ONLY",
        targetId: currentTopicOnly[0].targetId,
        edgeId: currentTopicOnly[0].edgeId,
        origin: null,
        reason: `N17: topic-only route — edge ${currentTopicOnly[0].edgeId} shares topic labels only; not a navigable route`,
      };
    }

    // Remaining edges are stale/unknown SUFFICIENT (partial stale case)
    return {
      routeClass: "STALE_REJECTED",
      targetId: null,
      edgeId: null,
      origin: null,
      reason: `N16: stale relationship — no current sufficient edge from ${sourceId}; no recovery claim`,
    };
  }

  // -------------------------------------------------------------------------
  // Size
  // -------------------------------------------------------------------------

  edgeCount(): number {
    return this.edges.size;
  }
}

// ---------------------------------------------------------------------------
// RecoveryService
// ---------------------------------------------------------------------------

/**
 * RecoveryService manages origin-preserving return routing and linked retry.
 *
 * A "detour" is opened when a session needs to visit a related task before
 * returning. The origin anchor is captured exactly once and preserved until
 * the return is confirmed. No route is invented if the graph rejects it.
 */
export class RecoveryService {
  private readonly graph: RelationGraph;
  /** Open detours: detourId → { origin, targetId } */
  private readonly openDetours: Map<string, { origin: OriginAnchor; targetId: string }> = new Map();

  constructor(graph: RelationGraph) {
    this.graph = graph;
  }

  /**
   * Open a detour from sourceId for the given origin anchor.
   * Returns the RouteResult — caller must check routeClass before navigating.
   * Only ELIGIBLE_ROUTE may be used for navigation; others must be rejected.
   */
  openDetour(
    detourId: string,
    sourceId: string,
    origin: OriginAnchor
  ): RouteResult {
    if(!detourId||this.openDetours.has(detourId))throw new RelationError('DETOUR_ID_CONFLICT','Detour already exists');
    const result = this.graph.resolveRoute(sourceId, origin);
    if (result.routeClass === "ELIGIBLE_ROUTE" && result.targetId !== null) {
      this.openDetours.set(detourId, { origin:Object.freeze({...origin}), targetId: result.targetId });
    }
    return result;
  }

  /**
   * Close a detour and return the exact origin anchor for return routing.
   * Throws DETOUR_NOT_FOUND if detourId was never opened or was already closed.
   * The returned anchor contains the exact release/session/cursor/attemptId
   * — no invention permitted.
   */
  closeDetour(detourId: string): OriginAnchor {
    const detour = this.openDetours.get(detourId);
    if (!detour) {
      throw new RelationError(
        "DETOUR_NOT_FOUND",
        `No open detour with id ${detourId}; cannot return origin`
      );
    }
    this.openDetours.delete(detourId);
    return detour.origin;
  }

  /**
   * Check whether a detour is currently open.
   */
  isDetourOpen(detourId: string): boolean {
    return this.openDetours.has(detourId);
  }

  /**
   * Returns the number of currently open detours.
   */
  openDetourCount(): number {
    return this.openDetours.size;
  }

  /**
   * Resolve a linked retry: find another eligible route from sourceId
   * with a fresh origin (called after a failed first attempt at the detour target).
   * Returns NO_ROUTE if no retry path exists.
   */
  resolveLinkedRetry(sourceId: string, retryOrigin: OriginAnchor): RouteResult {
    return this.graph.resolveRoute(sourceId, retryOrigin);
  }
}

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------

export function createRelationGraph(): RelationGraph {
  return new RelationGraph();
}

export function createRecoveryService(graph: RelationGraph): RecoveryService {
  return new RecoveryService(graph);
}
