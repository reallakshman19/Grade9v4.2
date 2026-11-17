# Application Bridge Threat Model and Security Analysis (Workpack A60)

## 1. Overview
This threat model analyzes security boundaries, adversarial vectors, and mitigation controls for third-party, legacy, or untrusted learning interactive applications hosted within Grade9v4.2.

**Rule 13 Invariant:**
> **No academic approval inferred from software validation.**

---

## 2. Threat Actors and Capabilities

| Threat Actor | Motivation | Assumed Capabilities |
| :--- | :--- | :--- |
| **Malicious or Compromised App** | Steal learner tokens, exfiltrate private attempts, spoof mastery, deface UI | Full execution of arbitrary JavaScript inside sandboxed `<iframe>` |
| **Cheating Student** | Fake perfect exam scores, bypass question locks, extract answer keys | Browser DevTools inspection, network intercept, postMessage injection |
| **Vulnerable Legacy Asset** | Accidental prototype bugs, memory leaks, infinite loops, hanging timers | Unsanitized DOM writes, unbounded memory consumption, frozen event loops |

---

## 3. Threat Vectors and Architectural Mitigations

### 3.1 Cross-Origin Storage Theft & Session Hijacking
- **Threat:** App script accesses `localStorage`, `sessionStorage`, or `IndexedDB` of Grade9 host to steal learner auth credentials or progress records.
- **Mitigation:**
  - `<iframe>` sandbox policy is strictly `sandbox="allow-scripts"`.
  - The dangerous token `allow-same-origin` is **strictly forbidden**.
  - In browsers, `sandbox="allow-scripts"` without `allow-same-origin` enforces an opaque origin (`origin === "null"`), preventing cross-origin access to host storage by the browser's native Same-Origin Policy.
  - In production multi-origin deployments, apps are hosted on dedicated untrusted subdomains (e.g. `sandbox.grade9.internal`).

### 3.2 Top-Level Navigation Defacement & Phishing
- **Threat:** App uses `window.top.location = ...` or `window.open()` to navigate the learner to a phishing page or external malware.
- **Mitigation:**
  - Sandbox tokens `allow-top-navigation`, `allow-popups`, and `allow-modals` are omitted.
  - Navigation can only occur via structured `NAVIGATE_REQUEST` bridge messages, which the host verifies against the verified canonical resource registry.

### 3.3 Message Injection & Spoofing via `postMessage`
- **Threat:** Adversary script on another tab or compromised frame broadcasts forged `OBSERVATION` or `STATE_SNAPSHOT` messages.
- **Mitigation:**
  - **WindowProxy Check:** The host listener verifies `event.source === frame.contentWindow`.
  - **Cryptographic Nonce:** Every message must contain the unpredictable 32-to-64 hex character nonce delivered only to that specific instance upon creation.
  - **Monotonic Sequence:** Every message requires a strictly increasing sequence counter (`0, 1, 2, ...`). Replays are rejected fail-closed.

### 3.4 Protected Score Tampering & Mastery Inflation
- **Threat:** App attempts to send a fake score (e.g. `{"score": 100, "mastery": "EXCELLENT"}`) to claim course completion without answering questions.
- **Mitigation:**
  - The bridge message schema (`bridge-messages.schema.json`) defines a closed schema. Any message attempting to specify `score`, `mastery`, `evaluator`, or `passed` is rejected as schema invalid.
  - Scoring and evaluation are exclusively performed by the host's pure assessment evaluator (`schemas/platform/assessment.schema.json`).
  - `OBSERVATION` messages are treated as untrusted student telemetry (e.g. "student adjusted slider to 5.2"), never certified assessment outcomes.

### 3.5 Denial of Service: Resource Exhaustion & Payload Flooding
- **Threat:** App floods host with megabytes of JSON data or recursive objects causing UI thread freeze or memory crashes.
- **Mitigation:**
  - Maximum serialized message size cap: **64 KiB** (65,536 bytes). Messages exceeding this size are rejected without deserialization.
  - Maximum JSON object nesting depth: **8 levels**.
  - Numbers must be finite IEEE 754 floating point values (`NaN` and `Infinity` rejected).
  - Host implements watchdog timeout: if an app hangs or fails to respond to handshake within 5000ms, host falls back to safe error state and allows learner to exit cleanly.

### 3.6 Answer Key Leakage in Protected Assessments
- **Threat:** Legacy interactive application bundle contains hardcoded exam answers or unrevealed solution steps within its bundle.
- **Mitigation:**
  - In protected examination mode, answer-bearing applications are forbidden from mounting unless an independent pre-commit disclosure receipt certifies that no hidden answer keys reside within client-side memory.
