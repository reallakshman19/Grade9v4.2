/**
 * tests/runtime/relations.test.ts
 * A20 – Tests for relation graph and recovery service
 *
 * Covers: N16 (stale relationship → no recovery claim), N17 (topic-only route
 * → label only, not a route), exact origin and attempt IDs after detour,
 * no invented route, no route on stale/unknown evidence, exact return,
 * linked retry, bidirectional index, edge staleness marking.
 *
 * No academic approval inferred from software validation.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  createRelationGraph,
  createRecoveryService,
  RelationError,
} from "../../web/runtime/relations.ts";

import type {
  RelationEdge,
  OriginAnchor,
  RouteResult,
} from "../../web/runtime/relations.ts";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

let _edgeSeq = 0;
function makeEdge(overrides: Partial<RelationEdge> = {}): RelationEdge {
  const n = ++_edgeSeq;
  return {
    edgeId: `edge-${n}`,
    sourceId: "src-A",
    targetId: "tgt-B",
    kind: "SUFFICIENT",
    evidence: "CURRENT",
    registeredRevision: "rev-1",
    registeredAt: Date.now(),
    ...overrides,
  };
}

function makeOrigin(overrides: Partial<OriginAnchor> = {}): OriginAnchor {
  return {
    releaseId: "rel-001",
    sessionId: "sess-001",
    cursorIndex: 3,
    attemptId: "att-001",
    capturedAt: Date.now(),
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// RelationGraph – registration and bidirectional index
// ---------------------------------------------------------------------------

describe("RelationGraph – edge registration", () => {
  it("registers an edge and finds it via edgesFrom", () => {
    const g = createRelationGraph();
    const e = makeEdge({ sourceId: "A", targetId: "B" });
    g.register(e);
    const result = g.edgesFrom("A");
    assert.equal(result.length, 1);
    assert.equal(result[0].edgeId, e.edgeId);
  });

  it("finds edge via edgesTo (reverse index)", () => {
    const g = createRelationGraph();
    const e = makeEdge({ sourceId: "A", targetId: "B" });
    g.register(e);
    const result = g.edgesTo("B");
    assert.equal(result.length, 1);
    assert.equal(result[0].sourceId, "A");
  });

  it("re-registration (idempotent on edgeId) updates edge", () => {
    const g = createRelationGraph();
    const e = makeEdge({ sourceId: "A", targetId: "B", evidence: "CURRENT" });
    g.register(e);
    g.register({ ...e, evidence: "STALE" });
    const found = g.getEdge(e.edgeId);
    assert.equal(found?.evidence, "STALE");
    assert.equal(g.edgeCount(), 1); // still one edge
  });

  it("edgesFrom returns empty for unknown sourceId", () => {
    const g = createRelationGraph();
    assert.deepEqual(g.edgesFrom("nobody"), []);
  });

  it("edgesTo returns empty for unknown targetId", () => {
    const g = createRelationGraph();
    assert.deepEqual(g.edgesTo("nobody"), []);
  });

  it("supports multiple edges from same source", () => {
    const g = createRelationGraph();
    g.register(makeEdge({ sourceId: "X", targetId: "Y" }));
    g.register(makeEdge({ sourceId: "X", targetId: "Z" }));
    assert.equal(g.edgesFrom("X").length, 2);
  });

  it("markStale changes evidence to STALE", () => {
    const g = createRelationGraph();
    const e = makeEdge({ evidence: "CURRENT" });
    g.register(e);
    g.markStale(e.edgeId);
    assert.equal(g.getEdge(e.edgeId)?.evidence, "STALE");
  });

  it("markStale throws for unknown edgeId", () => {
    const g = createRelationGraph();
    assert.throws(
      () => g.markStale("ghost-edge"),
      (e: unknown) => e instanceof RelationError && e.code === "EDGE_NOT_FOUND"
    );
  });
});

// ---------------------------------------------------------------------------
// Route resolution – ELIGIBLE_ROUTE
// ---------------------------------------------------------------------------

describe("RelationGraph – route resolution (ELIGIBLE_ROUTE)", () => {
  it("resolves ELIGIBLE_ROUTE for SUFFICIENT + CURRENT edge", () => {
    const g = createRelationGraph();
    const e = makeEdge({ sourceId: "A", targetId: "B", kind: "SUFFICIENT", evidence: "CURRENT" });
    g.register(e);
    const origin = makeOrigin();
    const r = g.resolveRoute("A", origin);
    assert.equal(r.routeClass, "ELIGIBLE_ROUTE");
    assert.equal(r.targetId, "B");
    assert.equal(r.edgeId, e.edgeId);
    assert.deepEqual(r.origin, origin);
  });

  it("ELIGIBLE_ROUTE preserves exact origin anchor fields", () => {
    const g = createRelationGraph();
    g.register(makeEdge({ sourceId: "X", targetId: "Y" }));
    const origin = makeOrigin({
      releaseId: "rel-XYZ",
      sessionId: "sess-ABC",
      cursorIndex: 7,
      attemptId: "att-999",
    });
    const r = g.resolveRoute("X", origin);
    assert.equal(r.routeClass, "ELIGIBLE_ROUTE");
    assert.equal(r.origin?.releaseId, "rel-XYZ");
    assert.equal(r.origin?.sessionId, "sess-ABC");
    assert.equal(r.origin?.cursorIndex, 7);
    assert.equal(r.origin?.attemptId, "att-999");
  });
});

// ---------------------------------------------------------------------------
// N17 – topic-only route → LABEL_ONLY (not a route)
// ---------------------------------------------------------------------------

describe("N17 – topic-only route yields LABEL_ONLY, not a navigable route", () => {
  it("resolves LABEL_ONLY for TOPIC_ONLY + CURRENT edge", () => {
    const g = createRelationGraph();
    g.register(makeEdge({
      sourceId: "A",
      targetId: "B",
      kind: "TOPIC_ONLY",
      evidence: "CURRENT",
    }));
    const r = g.resolveRoute("A", makeOrigin());
    assert.equal(r.routeClass, "LABEL_ONLY");
    assert.equal(r.targetId, "B");
    assert.equal(r.origin, null); // origin NOT embedded — not a navigable route
    assert.ok(r.reason.includes("N17"));
  });

  it("SUFFICIENT edge takes priority over TOPIC_ONLY edge from same source", () => {
    const g = createRelationGraph();
    g.register(makeEdge({ sourceId: "A", targetId: "B", kind: "TOPIC_ONLY", evidence: "CURRENT" }));
    g.register(makeEdge({ sourceId: "A", targetId: "C", kind: "SUFFICIENT", evidence: "CURRENT" }));
    const r = g.resolveRoute("A", makeOrigin());
    assert.equal(r.routeClass, "ELIGIBLE_ROUTE");
    assert.equal(r.targetId, "C");
  });
});

// ---------------------------------------------------------------------------
// N16 – stale relationship → no recovery claim
// ---------------------------------------------------------------------------

describe("N16 – stale relationship yields no recovery claim", () => {
  it("STALE_REJECTED when only STALE SUFFICIENT edge exists", () => {
    const g = createRelationGraph();
    g.register(makeEdge({ sourceId: "A", targetId: "B", kind: "SUFFICIENT", evidence: "STALE" }));
    const r = g.resolveRoute("A", makeOrigin());
    assert.equal(r.routeClass, "STALE_REJECTED");
    assert.equal(r.targetId, null);
    assert.equal(r.origin, null);
    assert.ok(r.reason.includes("N16"));
  });

  it("STALE_REJECTED when only UNKNOWN evidence edge exists", () => {
    const g = createRelationGraph();
    g.register(makeEdge({ sourceId: "A", targetId: "B", evidence: "UNKNOWN" }));
    const r = g.resolveRoute("A", makeOrigin());
    assert.equal(r.routeClass, "STALE_REJECTED");
    assert.ok(r.reason.includes("N16"));
  });

  it("STALE_REJECTED after markStale is called on the only edge", () => {
    const g = createRelationGraph();
    const e = makeEdge({ sourceId: "A", targetId: "B" });
    g.register(e);
    g.markStale(e.edgeId);
    const r = g.resolveRoute("A", makeOrigin());
    assert.equal(r.routeClass, "STALE_REJECTED");
  });

  it("NO_ROUTE when no edges registered", () => {
    const g = createRelationGraph();
    const r = g.resolveRoute("A", makeOrigin());
    assert.equal(r.routeClass, "NO_ROUTE");
    assert.equal(r.targetId, null);
  });
});

// ---------------------------------------------------------------------------
// RecoveryService – open/close detour with exact origin
// ---------------------------------------------------------------------------

describe("RecoveryService – detour lifecycle", () => {
  it("openDetour returns ELIGIBLE_ROUTE and stores origin", () => {
    const g = createRelationGraph();
    g.register(makeEdge({ sourceId: "S", targetId: "T" }));
    const svc = createRecoveryService(g);
    const origin = makeOrigin({ sessionId: "sess-X", cursorIndex: 5 });
    const r = svc.openDetour("detour-1", "S", origin);
    assert.equal(r.routeClass, "ELIGIBLE_ROUTE");
    assert.equal(svc.isDetourOpen("detour-1"), true);
  });

  it("closeDetour returns exact original origin anchor", () => {
    const g = createRelationGraph();
    g.register(makeEdge({ sourceId: "S", targetId: "T" }));
    const svc = createRecoveryService(g);
    const origin = makeOrigin({
      releaseId: "rel-EXACT",
      sessionId: "sess-EXACT",
      cursorIndex: 11,
      attemptId: "att-EXACT",
    });
    svc.openDetour("detour-2", "S", origin);
    const returned = svc.closeDetour("detour-2");
    // Exact origin fields preserved — no invention
    assert.equal(returned.releaseId, "rel-EXACT");
    assert.equal(returned.sessionId, "sess-EXACT");
    assert.equal(returned.cursorIndex, 11);
    assert.equal(returned.attemptId, "att-EXACT");
    assert.equal(svc.isDetourOpen("detour-2"), false);
  });

  it("closeDetour throws DETOUR_NOT_FOUND for unknown detourId", () => {
    const g = createRelationGraph();
    const svc = createRecoveryService(g);
    assert.throws(
      () => svc.closeDetour("ghost"),
      (e: unknown) => e instanceof RelationError && e.code === "DETOUR_NOT_FOUND"
    );
  });

  it("openDetour with STALE_REJECTED does NOT store a detour", () => {
    const g = createRelationGraph();
    g.register(makeEdge({ sourceId: "S", targetId: "T", evidence: "STALE" }));
    const svc = createRecoveryService(g);
    const r = svc.openDetour("detour-stale", "S", makeOrigin());
    assert.equal(r.routeClass, "STALE_REJECTED");
    assert.equal(svc.isDetourOpen("detour-stale"), false); // N16: no recovery claim stored
  });

  it("openDetour with LABEL_ONLY does NOT store a detour", () => {
    const g = createRelationGraph();
    g.register(makeEdge({ sourceId: "S", targetId: "T", kind: "TOPIC_ONLY", evidence: "CURRENT" }));
    const svc = createRecoveryService(g);
    const r = svc.openDetour("detour-label", "S", makeOrigin());
    assert.equal(r.routeClass, "LABEL_ONLY");
    assert.equal(svc.isDetourOpen("detour-label"), false); // N17: not a route
  });

  it("openDetourCount tracks open detours", () => {
    const g = createRelationGraph();
    g.register(makeEdge({ edgeId: "e-c1", sourceId: "P", targetId: "Q" }));
    g.register(makeEdge({ edgeId: "e-c2", sourceId: "R", targetId: "S" }));
    const svc = createRecoveryService(g);
    svc.openDetour("d1", "P", makeOrigin());
    svc.openDetour("d2", "R", makeOrigin());
    assert.equal(svc.openDetourCount(), 2);
    svc.closeDetour("d1");
    assert.equal(svc.openDetourCount(), 1);
  });
});

// ---------------------------------------------------------------------------
// Linked retry
// ---------------------------------------------------------------------------

describe("RecoveryService – linked retry", () => {
  it("resolveLinkedRetry returns ELIGIBLE_ROUTE when path exists", () => {
    const g = createRelationGraph();
    g.register(makeEdge({ sourceId: "A", targetId: "B" }));
    const svc = createRecoveryService(g);
    const retryOrigin = makeOrigin({ attemptId: "att-retry-01" });
    const r = svc.resolveLinkedRetry("A", retryOrigin);
    assert.equal(r.routeClass, "ELIGIBLE_ROUTE");
    assert.equal(r.origin?.attemptId, "att-retry-01");
  });

  it("resolveLinkedRetry returns NO_ROUTE when graph has no edges", () => {
    const g = createRelationGraph();
    const svc = createRecoveryService(g);
    const r = svc.resolveLinkedRetry("nobody", makeOrigin());
    assert.equal(r.routeClass, "NO_ROUTE");
  });

  it("resolveLinkedRetry returns STALE_REJECTED on stale evidence", () => {
    const g = createRelationGraph();
    g.register(makeEdge({ sourceId: "A", targetId: "B", evidence: "STALE" }));
    const svc = createRecoveryService(g);
    const r = svc.resolveLinkedRetry("A", makeOrigin());
    assert.equal(r.routeClass, "STALE_REJECTED");
  });
});

it('rejects edge reparenting, ambiguous routes and detour origin replacement',()=>{const g=createRelationGraph(),e=makeEdge();g.register(e);assert.throws(()=>g.register({...e,sourceId:'wrong'}),/Cannot replace edge identity/);const o=makeOrigin(),s=createRecoveryService(g);s.openDetour('d',e.sourceId,o);assert.throws(()=>s.openDetour('d',e.sourceId,{...o,sessionId:'foreign'}),/Detour already exists/);assert.deepEqual(s.closeDetour('d'),o);g.register(makeEdge({sourceId:e.sourceId,targetId:'other'}));assert.equal(g.resolveRoute(e.sourceId,o).routeClass,'NO_ROUTE');});
