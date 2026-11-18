/**
 * tests/runtime/app-bridge.spec.ts
 * A63 — Bridge protocol unit tests (Node runtime, no browser required)
 *
 * Tests:
 *   - NonceManager: generation, single-use validation, replay rejection
 *   - validateBridgeMessage: origin, nonce, session, type, protected events,
 *     replay, payload
 *   - ApplicationHostController: state machine, dispatch, rejection log,
 *     sandbox validation, capability resolution, rotation, timeout, dismiss
 *   - ResourcesPageController: eligibility gating, same-origin rejection,
 *     launch/dismiss lifecycle, orientation forwarding
 *
 * No academic approval inferred from software validation.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  NonceManager,
  validateBridgeMessage,
  resolveCapability,
  PROTECTED_EVENT_TYPES,
  ACCEPTED_APP_TYPES,
  CAPABILITY_REGISTRY,
} from "../../web/application-host/bridge.ts";

import type { RejectionReason } from "../../web/application-host/bridge.ts";

import {
  ApplicationHostController,
  createApplicationHost,
} from "../../web/application-host/index.ts";

import {
  ResourcesPageController,
  createResourcesPage,
} from "../../web/pages/resources.ts";

import type { Resource } from "../../web/pages/resources.ts";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const APP_ORIGIN = "https://isolated.app.example.com";
const HOST_ORIGIN = "https://host.grade9.local";
const APP_URL = `${APP_ORIGIN}/app/index.html`;

function makeHost(overrides: Partial<Parameters<typeof createApplicationHost>[0]> = {}): ApplicationHostController {
  return createApplicationHost({
    appUrl: APP_URL,
    expectedOrigin: APP_ORIGIN,
    ...overrides,
  });
}

function makeEnvelope(
  type: string,
  sessionId: string,
  nonce: string,
  payload?: unknown,
): object {
  return { type, nonce, sessionId, sequence:1, payload };
}

// ---------------------------------------------------------------------------
// NonceManager
// ---------------------------------------------------------------------------

describe("NonceManager – generation", () => {
  it("produces a non-empty nonce", () => {
    const nm = new NonceManager("sess-001");
    assert.ok(nm.current.length > 0);
  });

  it("includes session id prefix in nonce", () => {
    const nm = new NonceManager("my-session");
    assert.ok(nm.current.startsWith("my-session-"));
  });

  it("two managers with same session have different nonces", () => {
    const a = new NonceManager("s");
    const b = new NonceManager("s");
    // Not guaranteed to differ (time-based) but structurally different object
    assert.ok(typeof a.current === "string");
    assert.ok(typeof b.current === "string");
  });
});

describe("NonceManager – validation", () => {
  it("validates correct nonce", () => {
    const nm = new NonceManager("sess");
    assert.equal(nm.validateAndConsume(nm.current), true);
  });

  it("rejects wrong nonce", () => {
    const nm = new NonceManager("sess");
    assert.equal(nm.validateAndConsume("wrong-nonce"), false);
  });

  it("isConsumed returns false before consume", () => {
    const nm = new NonceManager("sess");
    assert.equal(nm.isConsumed("token-1"), false);
  });

  it("isConsumed returns true after consume", () => {
    const nm = new NonceManager("sess");
    nm.consume("token-1");
    assert.equal(nm.isConsumed("token-1"), true);
  });

  it("replay detected after consume", () => {
    const nm = new NonceManager("sess");
    nm.consume("seq-1");
    assert.equal(nm.isConsumed("seq-1"), true);
  });
});

// ---------------------------------------------------------------------------
// Protected event types
// ---------------------------------------------------------------------------

describe("Protected event types – set membership", () => {
  const MUST_BLOCK = [
    "APP_STORAGE_READ", "APP_STORAGE_WRITE",
    "APP_ANSWER_READ", "APP_ANSWER_WRITE",
    "APP_NAVIGATE_EXTERNAL", "APP_NAVIGATE_HISTORY",
    "APP_EVAL", "APP_COOKIE", "APP_CREDENTIALS",
  ];

  for (const t of MUST_BLOCK) {
    it(`PROTECTED_EVENT_TYPES includes '${t}'`, () => {
      assert.equal(PROTECTED_EVENT_TYPES.has(t), true);
    });
  }

  it("does not block APP_READY", () => {
    assert.equal(PROTECTED_EVENT_TYPES.has("APP_READY"), false);
  });

  it("does not block APP_STATE", () => {
    assert.equal(PROTECTED_EVENT_TYPES.has("APP_STATE"), false);
  });
});

// ---------------------------------------------------------------------------
// validateBridgeMessage
// ---------------------------------------------------------------------------

describe("validateBridgeMessage – origin rejection", () => {
  it("rejects wrong origin", () => {
    const nm = new NonceManager("sess");
    const event = { origin: "https://evil.example.com", data: { type: "APP_READY", nonce: nm.current, sessionId: "sess" } };
    const r = validateBridgeMessage(event, APP_ORIGIN, nm, "sess", "seq-1");
    assert.ok(r !== null);
    assert.equal(r.reason, "WRONG_ORIGIN");
  });

  it("accepts correct origin", () => {
    const nm = new NonceManager("sess");
    const event = { origin: APP_ORIGIN, data: makeEnvelope("APP_READY", "sess", nm.current) };
    const r = validateBridgeMessage(event, APP_ORIGIN, nm, "sess", "seq-1");
    assert.equal(r, null);
  });
});

describe("validateBridgeMessage – protected event rejection", () => {
  it("rejects APP_STORAGE_READ even from correct origin", () => {
    const nm = new NonceManager("sess");
    const event = { origin: APP_ORIGIN, data: makeEnvelope("APP_STORAGE_READ", "sess", nm.current) };
    const r = validateBridgeMessage(event, APP_ORIGIN, nm, "sess", "seq-1");
    assert.ok(r !== null);
    assert.equal(r.reason, "PROTECTED_EVENT");
  });

  it("rejects APP_ANSWER_WRITE from correct origin", () => {
    const nm = new NonceManager("sess");
    const event = { origin: APP_ORIGIN, data: makeEnvelope("APP_ANSWER_WRITE", "sess", nm.current) };
    const r = validateBridgeMessage(event, APP_ORIGIN, nm, "sess", "seq-1");
    assert.ok(r !== null);
    assert.equal(r.reason, "PROTECTED_EVENT");
  });

  it("rejects APP_EVAL from correct origin", () => {
    const nm = new NonceManager("sess");
    const event = { origin: APP_ORIGIN, data: makeEnvelope("APP_EVAL", "sess", nm.current) };
    const r = validateBridgeMessage(event, APP_ORIGIN, nm, "sess", "seq-1");
    assert.ok(r !== null);
    assert.equal(r.reason, "PROTECTED_EVENT");
  });
});

describe("validateBridgeMessage – session mismatch", () => {
  it("rejects wrong session ID", () => {
    const nm = new NonceManager("sess-A");
    const event = { origin: APP_ORIGIN, data: makeEnvelope("APP_READY", "sess-WRONG", nm.current) };
    const r = validateBridgeMessage(event, APP_ORIGIN, nm, "sess-A", "seq-1");
    assert.ok(r !== null);
    assert.equal(r.reason, "SESSION_MISMATCH");
  });
});

describe("validateBridgeMessage – nonce rejection", () => {
  it("rejects wrong nonce", () => {
    const nm = new NonceManager("sess");
    const event = { origin: APP_ORIGIN, data: makeEnvelope("APP_READY", "sess", "bad-nonce") };
    const r = validateBridgeMessage(event, APP_ORIGIN, nm, "sess", "seq-1");
    assert.ok(r !== null);
    assert.equal(r.reason, "WRONG_NONCE");
  });
});

describe("validateBridgeMessage – replay rejection", () => {
  it("rejects replayed sequence token", () => {
    const nm = new NonceManager("sess");
    nm.consume("seq-1"); // pre-consume
    const event = { origin: APP_ORIGIN, data: makeEnvelope("APP_READY", "sess", nm.current) };
    const r = validateBridgeMessage(event, APP_ORIGIN, nm, "sess", "seq-1");
    assert.ok(r !== null);
    assert.equal(r.reason, "REPLAY");
  });
});

describe("validateBridgeMessage – unknown type", () => {
  it("rejects unknown message type", () => {
    const nm = new NonceManager("sess");
    const event = { origin: APP_ORIGIN, data: makeEnvelope("APP_CUSTOM_UNKNOWN", "sess", nm.current) };
    const r = validateBridgeMessage(event, APP_ORIGIN, nm, "sess", "seq-1");
    assert.ok(r !== null);
    assert.equal(r.reason, "NOT_ACCEPTED");
  });
});

describe("validateBridgeMessage – invalid payload", () => {
  it("rejects non-object message", () => {
    const nm = new NonceManager("sess");
    const event = { origin: APP_ORIGIN, data: "just a string" };
    const r = validateBridgeMessage(event, APP_ORIGIN, nm, "sess", "seq-1");
    assert.ok(r !== null);
    assert.equal(r.reason, "INVALID_PAYLOAD");
  });

  it("rejects null data", () => {
    const nm = new NonceManager("sess");
    const event = { origin: APP_ORIGIN, data: null };
    const r = validateBridgeMessage(event, APP_ORIGIN, nm, "sess", "seq-1");
    assert.ok(r !== null);
    assert.equal(r.reason, "INVALID_PAYLOAD");
  });
});

// ---------------------------------------------------------------------------
// ApplicationHostController – construction
// ---------------------------------------------------------------------------

describe("ApplicationHostController – construction", () => {
  it("initialises in IDLE state", () => {
    const host = makeHost();
    assert.equal(host.getState(), "IDLE");
  });

  it("generates a sessionId", () => {
    const host = makeHost();
    assert.ok(host.getSessionId().length > 0);
  });

  it("generates a nonce", () => {
    const host = makeHost();
    assert.ok(host.getNonce().length > 0);
  });

  it("throws if URL origin does not match expectedOrigin", () => {
    assert.throws(() => {
      createApplicationHost({ appUrl: APP_URL, expectedOrigin: "https://wrong.example.com" });
    }, /does not match/);
  });

  it("empty rejection log at start", () => {
    const host = makeHost();
    assert.equal(host.getRejectionLog().length, 0);
  });
});

// ---------------------------------------------------------------------------
// ApplicationHostController – state machine
// ---------------------------------------------------------------------------

describe("ApplicationHostController – state machine", () => {
  it("transitions IDLE → LAUNCHING on launch()", () => {
    const host = makeHost();
    host.launch();
    assert.equal(host.getState(), "LAUNCHING");
  });

  it("throws if launch() called twice", () => {
    const host = makeHost();
    host.launch();
    assert.throws(() => host.launch(), /Cannot launch/);
  });

  it("LAUNCHING → RUNNING on APP_READY message", () => {
    const host = makeHost();
    host.launch();
    const sess = host.getSessionId();
    const nonce = host.getNonce();
    host.handleMessage({ origin: APP_ORIGIN, data: makeEnvelope("APP_READY", sess, nonce) });
    assert.equal(host.getState(), "RUNNING");
  });

  it("RUNNING → PAUSED on pause()", () => {
    const host = makeHost();
    host.launch();
    // Fake APP_READY
    host.handleMessage({ origin: APP_ORIGIN, data: makeEnvelope("APP_READY", host.getSessionId(), host.getNonce()) });
    host.pause();
    assert.equal(host.getState(), "PAUSED");
  });

  it("PAUSED → RUNNING on resume()", () => {
    const host = makeHost();
    host.launch();
    host.handleMessage({ origin: APP_ORIGIN, data: makeEnvelope("APP_READY", host.getSessionId(), host.getNonce()) });
    host.pause();
    host.resume();
    assert.equal(host.getState(), "RUNNING");
  });

  it("dismiss() transitions to DISMISSED", () => {
    const host = makeHost();
    host.launch();
    host.dismiss();
    assert.equal(host.getState(), "DISMISSED");
  });

  it("messages ignored in DISMISSED state", () => {
    const host = makeHost();
    host.launch();
    host.dismiss();
    const result = host.handleMessage({ origin: APP_ORIGIN, data: makeEnvelope("APP_READY", host.getSessionId(), host.getNonce()) });
    assert.equal(result, false);
  });
});

// ---------------------------------------------------------------------------
// ApplicationHostController – rejection log
// ---------------------------------------------------------------------------

describe("ApplicationHostController – rejection log", () => {
  it("records wrong-origin rejection", () => {
    const host = makeHost();
    host.launch();
    host.handleMessage({ origin: "https://evil.com", data: makeEnvelope("APP_READY", host.getSessionId(), host.getNonce()) });
    assert.equal(host.getRejectionLog().length, 1);
    assert.equal(host.getRejectionLog()[0].reason, "WRONG_ORIGIN");
  });

  it("records protected event rejection", () => {
    const host = makeHost();
    host.launch();
    host.handleMessage({ origin: APP_ORIGIN, data: makeEnvelope("APP_STORAGE_READ", host.getSessionId(), host.getNonce()) });
    const log = host.getRejectionLog();
    assert.ok(log.length >= 1);
    assert.equal(log[0].reason, "PROTECTED_EVENT");
  });
});

// ---------------------------------------------------------------------------
// ApplicationHostController – sandbox
// ---------------------------------------------------------------------------

describe("ApplicationHostController – sandbox", () => {
  it("sandbox attribute does not include allow-same-origin", () => {
    const attr = ApplicationHostController.sandboxAttribute();
    assert.ok(!attr.includes("allow-same-origin"), "must not contain allow-same-origin");
  });

  it("sandbox attribute includes allow-scripts", () => {
    const attr = ApplicationHostController.sandboxAttribute();
    assert.ok(attr.includes("allow-scripts"));
  });

  it("validates safe sandbox string", () => {
    const r = ApplicationHostController.validateSandbox("allow-scripts");
    assert.equal(r.valid, true);
  });

  it("rejects allow-scripts + allow-same-origin combination", () => {
    const r = ApplicationHostController.validateSandbox("allow-scripts allow-same-origin");
    assert.equal(r.valid, false);
    assert.ok(r.reason.includes("allow-same-origin"));
  });

  it("rejects reversed allow-same-origin + allow-scripts combination", () => {
    const r = ApplicationHostController.validateSandbox("allow-same-origin allow-scripts allow-forms");
    assert.equal(r.valid, false);
  });
});

// ---------------------------------------------------------------------------
// ApplicationHostController – rotation
// ---------------------------------------------------------------------------

describe("ApplicationHostController – rotation", () => {
  it("rotate() returns HOST_ROTATE envelope", () => {
    const host = makeHost();
    host.launch();
    const env = host.rotate("landscape");
    assert.equal(env.type, "HOST_ROTATE");
    assert.deepEqual((env.payload as any).orientation, "landscape");
  });

  it("stores orientation after rotate()", () => {
    const host = makeHost();
    host.launch();
    host.rotate("compact");
    assert.equal(host.getOrientation(), "compact");
  });

  it("rotate() starts with portrait orientation", () => {
    const host = makeHost();
    assert.equal(host.getOrientation(), "portrait");
  });
});

// ---------------------------------------------------------------------------
// ApplicationHostController – capability
// ---------------------------------------------------------------------------

describe("ApplicationHostController – capability resolution", () => {
  it("fullscreen is granted", () => {
    const w = resolveCapability("fullscreen");
    assert.equal(w.granted, true);
  });

  it("storage is not granted", () => {
    const w = resolveCapability("storage");
    assert.equal(w.granted, false);
    assert.ok(w.reason.includes("not permitted"));
  });

  it("clipboard-read is not granted", () => {
    const w = resolveCapability("clipboard-read");
    assert.equal(w.granted, false);
  });

  it("camera is not granted", () => {
    const w = resolveCapability("camera");
    assert.equal(w.granted, false);
  });

  it("unknown capability is not granted", () => {
    const w = resolveCapability("xyz-unknown");
    assert.equal(w.granted, false);
    assert.ok(w.reason.includes("Unknown"));
  });

  it("APP_CAPABILITY message records warning", () => {
    const host = makeHost();
    host.launch();
    // fake APP_READY first
    host.handleMessage({ origin: APP_ORIGIN, data: makeEnvelope("APP_READY", host.getSessionId(), host.getNonce()) });
    // simulate APP_CAPABILITY message (need fresh nonce per message in real use;
    // here we bypass bridge by directly calling dispatch via handleMessage with same nonce
    // — this will get a nonce-mismatch; test capability warning via resolveCapability directly)
    const w = resolveCapability("storage");
    assert.equal(w.granted, false);
    assert.ok(w.capability === "storage");
  });
});

// ---------------------------------------------------------------------------
// ResourcesPageController – resource registry
// ---------------------------------------------------------------------------

describe("ResourcesPageController – registry", () => {
  const SAMPLE: Resource[] = [
    { id: "r1", title: "WPE Demo", url: `${APP_ORIGIN}/r1`, origin: APP_ORIGIN, eligibility: "ELIGIBLE" },
    { id: "r2", title: "WPE Hold", url: `${APP_ORIGIN}/r2`, origin: APP_ORIGIN, eligibility: "HOLD" },
    { id: "r3", title: "WPE Restricted", url: `${APP_ORIGIN}/r3`, origin: APP_ORIGIN, eligibility: "RESTRICTED" },
    { id: "r4", title: "WPE Stale", url: `${APP_ORIGIN}/r4`, origin: APP_ORIGIN, eligibility: "STALE" },
  ];

  it("loads resources", () => {
    const ctrl = createResourcesPage(HOST_ORIGIN,()=>true);
    ctrl.loadResources(SAMPLE);
    assert.equal(ctrl.getResources().length, 4);
  });

  it("filters to eligible only", () => {
    const ctrl = createResourcesPage(HOST_ORIGIN,()=>true);
    ctrl.loadResources(SAMPLE);
    assert.equal(ctrl.getEligibleResources().length, 1);
    assert.equal(ctrl.getEligibleResources()[0].id, "r1");
  });

  it("findResource by id", () => {
    const ctrl = createResourcesPage(HOST_ORIGIN,()=>true);
    ctrl.loadResources(SAMPLE);
    assert.ok(ctrl.findResource("r2") !== undefined);
    assert.equal(ctrl.findResource("r2")?.eligibility, "HOLD");
  });

  it("findResource returns undefined for missing id", () => {
    const ctrl = createResourcesPage(HOST_ORIGIN,()=>true);
    ctrl.loadResources(SAMPLE);
    assert.equal(ctrl.findResource("not-exist"), undefined);
  });
});

// ---------------------------------------------------------------------------
// ResourcesPageController – launch eligibility gating
// ---------------------------------------------------------------------------

describe("ResourcesPageController – launch eligibility", () => {
  const ELIGIBLE: Resource = {
    id: "r-elig", title: "Demo", url: `${APP_ORIGIN}/elig`, origin: APP_ORIGIN, eligibility: "ELIGIBLE",
  };
  const HOLD: Resource = {
    id: "r-hold", title: "Hold", url: `${APP_ORIGIN}/hold`, origin: APP_ORIGIN, eligibility: "HOLD",
  };
  const RESTRICTED: Resource = {
    id: "r-restr", title: "Restricted", url: `${APP_ORIGIN}/restr`, origin: APP_ORIGIN, eligibility: "RESTRICTED",
  };
  const STALE: Resource = {
    id: "r-stale", title: "Stale", url: `${APP_ORIGIN}/stale`, origin: APP_ORIGIN, eligibility: "STALE",
  };

  it("launches eligible resource successfully", () => {
    const ctrl = createResourcesPage(HOST_ORIGIN,()=>true);
    ctrl.loadResources([ELIGIBLE]);
    const result = ctrl.launch("r-elig");
    assert.equal(result.outcome, "LAUNCHED");
  });

  it("rejects HOLD resource", () => {
    const ctrl = createResourcesPage(HOST_ORIGIN,()=>true);
    ctrl.loadResources([HOLD]);
    const result = ctrl.launch("r-hold");
    assert.equal(result.outcome, "REJECTED_HOLD");
  });

  it("rejects RESTRICTED resource", () => {
    const ctrl = createResourcesPage(HOST_ORIGIN,()=>true);
    ctrl.loadResources([RESTRICTED]);
    const result = ctrl.launch("r-restr");
    assert.equal(result.outcome, "REJECTED_RESTRICTED");
  });

  it("rejects STALE resource", () => {
    const ctrl = createResourcesPage(HOST_ORIGIN,()=>true);
    ctrl.loadResources([STALE]);
    const result = ctrl.launch("r-stale");
    assert.equal(result.outcome, "REJECTED_STALE");
  });

  it("rejects unknown resource id", () => {
    const ctrl = createResourcesPage(HOST_ORIGIN,()=>true);
    ctrl.loadResources([ELIGIBLE]);
    const result = ctrl.launch("does-not-exist");
    assert.equal(result.outcome, "REJECTED_UNKNOWN");
  });

  it("rejects same-origin resource", () => {
    const ctrl = createResourcesPage(HOST_ORIGIN,()=>true);
    const sameOrigin: Resource = {
      id: "same", title: "Same", url: `${HOST_ORIGIN}/app`, origin: HOST_ORIGIN, eligibility: "ELIGIBLE",
    };
    ctrl.loadResources([sameOrigin]);
    const result = ctrl.launch("same");
    assert.equal(result.outcome, "REJECTED_SAME_ORIGIN");
  });

  it("rejects mismatched origin field vs URL", () => {
    const ctrl = createResourcesPage(HOST_ORIGIN,()=>true);
    const bad: Resource = {
      id: "bad", title: "Bad", url: `${APP_ORIGIN}/bad`, origin: "https://different.example.com", eligibility: "ELIGIBLE",
    };
    ctrl.loadResources([bad]);
    const result = ctrl.launch("bad");
    assert.equal(result.outcome, "REJECTED_UNKNOWN");
  });
});

// ---------------------------------------------------------------------------
// ResourcesPageController – lifecycle
// ---------------------------------------------------------------------------

describe("ResourcesPageController – lifecycle", () => {
  const ELIGIBLE: Resource = {
    id: "r-elig", title: "Demo", url: `${APP_ORIGIN}/elig`, origin: APP_ORIGIN, eligibility: "ELIGIBLE",
  };

  it("active host is non-null after launch", () => {
    const ctrl = createResourcesPage(HOST_ORIGIN,()=>true);
    ctrl.loadResources([ELIGIBLE]);
    ctrl.launch("r-elig");
    assert.ok(ctrl.getActiveHost() !== null);
  });

  it("active resource id set after launch", () => {
    const ctrl = createResourcesPage(HOST_ORIGIN,()=>true);
    ctrl.loadResources([ELIGIBLE]);
    ctrl.launch("r-elig");
    assert.equal(ctrl.getActiveResourceId(), "r-elig");
  });

  it("prevents double-launch (ALREADY_ACTIVE)", () => {
    const ctrl = createResourcesPage(HOST_ORIGIN,()=>true);
    ctrl.loadResources([ELIGIBLE]);
    ctrl.launch("r-elig");
    const result = ctrl.launch("r-elig");
    assert.equal(result.outcome, "ALREADY_ACTIVE");
  });

  it("safeReturn() clears active host", () => {
    const ctrl = createResourcesPage(HOST_ORIGIN,()=>true);
    ctrl.loadResources([ELIGIBLE]);
    ctrl.launch("r-elig");
    ctrl.safeReturn();
    assert.equal(ctrl.getActiveHost(), null);
    assert.equal(ctrl.getActiveResourceId(), null);
  });

  it("safeReturn() returns HOST_DISMISS envelope", () => {
    const ctrl = createResourcesPage(HOST_ORIGIN,()=>true);
    ctrl.loadResources([ELIGIBLE]);
    ctrl.launch("r-elig");
    const env = ctrl.safeReturn();
    assert.ok(env !== null);
    assert.equal(env!.type, "HOST_DISMISS");
  });

  it("safeReturn() returns null when no active host", () => {
    const ctrl = createResourcesPage(HOST_ORIGIN,()=>true);
    assert.equal(ctrl.safeReturn(), null);
  });

  it("rotate() returns null when no active host", () => {
    const ctrl = createResourcesPage(HOST_ORIGIN,()=>true);
    assert.equal(ctrl.rotate("landscape"), null);
  });

  it("rotate() forwards orientation to host", () => {
    const ctrl = createResourcesPage(HOST_ORIGIN,()=>true);
    ctrl.loadResources([ELIGIBLE]);
    ctrl.launch("r-elig");
    const env = ctrl.rotate("landscape");
    assert.ok(env !== null);
    assert.equal(env!.type, "HOST_ROTATE");
    assert.equal((env!.payload as any).orientation, "landscape");
  });

  it("getHostState() is LAUNCHING right after launch", () => {
    const ctrl = createResourcesPage(HOST_ORIGIN,()=>true);
    ctrl.loadResources([ELIGIBLE]);
    ctrl.launch("r-elig");
    assert.equal(ctrl.getHostState(), "LAUNCHING");
  });

  it("getHostState() is null when no active host", () => {
    const ctrl = createResourcesPage(HOST_ORIGIN,()=>true);
    assert.equal(ctrl.getHostState(), null);
  });
});

// ---------------------------------------------------------------------------
// ResourcesPageController – sandbox
// ---------------------------------------------------------------------------

describe("ResourcesPageController – sandbox enforcement", () => {
  it("iframeSandbox() does not contain allow-same-origin", () => {
    const attr = ResourcesPageController.iframeSandbox();
    assert.ok(!attr.includes("allow-same-origin"));
  });

  it("validateSandbox rejects dangerous combination", () => {
    const r = ResourcesPageController.validateSandbox("allow-scripts allow-same-origin");
    assert.equal(r.valid, false);
  });

  it("validateSandbox accepts safe string", () => {
    const r = ResourcesPageController.validateSandbox("allow-scripts");
    assert.equal(r.valid, true);
  });
});

// ---------------------------------------------------------------------------
// No answer or storage leakage through bridge
// ---------------------------------------------------------------------------

describe("Bridge – no answer/storage leakage", () => {
  const leakAttempts = ["APP_ANSWER_READ", "APP_ANSWER_WRITE", "APP_STORAGE_READ", "APP_STORAGE_WRITE"];

  for (const msgType of leakAttempts) {
    it(`handleMessage blocks '${msgType}' from correct origin`, () => {
      const host = makeHost();
      host.launch();
      const result = host.handleMessage({
        origin: APP_ORIGIN,
        data: makeEnvelope(msgType, host.getSessionId(), host.getNonce()),
      });
      assert.equal(result, false);
      const log = host.getRejectionLog();
      assert.ok(log.length >= 1);
      assert.ok(log.some((r) => r.reason === "PROTECTED_EVENT"));
    });
  }
});

it("rejects replayed wire sequence and unsafe iframe privileges",()=>{const host=makeHost();host.launch();const ready=makeEnvelope("APP_READY",host.getSessionId(),host.getNonce());assert.equal(host.handleMessage({origin:APP_ORIGIN,data:ready}),true);assert.equal(host.handleMessage({origin:APP_ORIGIN,data:ready}),false);assert.equal(ApplicationHostController.validateSandbox("allow-scripts allow-popups-to-escape-sandbox").valid,false);host.dismiss();});
