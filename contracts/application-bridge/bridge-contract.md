# Isolated Application Bridge Contract (Workpack A60)

## 1. Scope and System Context
This contract specifies the security, communication, lifecycle, and telemetry boundaries between the Grade9 host application and third-party, legacy, or untrusted learning interactive applications.

**Rule 13 Invariant:**
> **No academic approval inferred from software validation.**

- **Workpack ID:** A60
- **Status:** CANDIDATE
- **Academic Admission:** HOLD
- **Production Release Authority:** NONE
- **UI Implementation Freeze:** NOT_FROZEN (pending signed A61)

---

## 2. Integration Modes: Portable Declarative vs Opaque Script Sandbox

| Dimension | `PORTABLE_ADAPTER` (e.g. Workpack A59) | `ISOLATED_HOST` (Opaque App Bridge) |
| :--- | :--- | :--- |
| **Execution Model** | Data-only JSON scene, rendered by host web component | Executable HTML/JS running in sandboxed `<iframe>` |
| **Script Privilege** | Zero executable script; rejected fail-closed | Sandboxed script execution (`sandbox="allow-scripts"`) |
| **Origin Isolation** | Same host origin (data-only, no dynamic eval) | Opaque origin (`event.origin === "null"`) or isolated subdomain |
| **DOM Access** | Rendered via `<semantic-workbench>` Shadow DOM | Separate iframe WindowProxy; zero access to host DOM |
| **Communication** | Native CustomEvents dispatched on component element | `window.postMessage` governed by `bridge-messages.schema.json` |
| **Placement Rules** | Named grids, rows, columns only; pixel values rejected | App controls internal canvas/DOM within iframe viewport |
| **Telemetry** | Semantic adapter transformation accepted/rejected | `OBSERVATION` and `STATE_SNAPSHOT` bridge messages |

---

## 3. Handshake and Message Protocol

### 3.1 Handshake Invariants
1. **Host-Generated Nonce:** Before loading an app iframe, the host generates a cryptographically secure random nonce (`^[0-9a-f]{32,64}$`).
2. **WindowProxy Binding:** The host captures the specific `contentWindow` reference (`WindowProxy`) upon creation. Messages received from any other window or iframe are discarded immediately.
3. **Initial `READY` Message:** The guest application must send a `READY` message bearing the host-provided nonce as its first transmission.
4. **Sequence Numbering:** Every subsequent message must increment a monotonic `sequence` counter (`0, 1, 2, ...`). Out-of-order, duplicate, or replayed sequences trigger an immediate bridge error and channel tear-down.

### 3.2 Permitted Message Allowlist
Only six discriminated message types are accepted:
1. `READY`: Handshake establishment and capability declaration.
2. `STATE_SNAPSHOT`: Serialized client state (max 64 KiB, max depth 8) stored strictly under app-isolated keys `(resource_id, revision, session_id)`.
3. `OBSERVATION`: Bounded numeric or scalar observation telemetry (e.g. slider adjustments, coordinate readings). Untrusted telemetry only.
4. `NAVIGATE_REQUEST`: Request to navigate to another registered, eligible resource ID.
5. `EXIT_REQUEST`: Request to terminate the current session.
6. `ERROR`: Diagnostic failure code.

### 3.3 Rejection Rules
- Any message with unknown `type` is rejected fail-closed.
- Any message containing executable script tags (`<script>`, `javascript:`, `eval`) or HTML commands is rejected.
- Payloads exceeding 65,536 bytes (64 KiB) serialized are rejected.
- Object nesting depth exceeding 8 levels is rejected.

---

## 4. Protected Store Immutability
Under no circumstances may an isolated application read or write to host protected stores:
- `learner_attempts`: Host only.
- `evaluation_scores`: Pure assessment module only.
- `topic_mastery`: Academic engine only.
- `academic_governance`: Owner/IR signed receipts only.
- `release_authority`: Owner/IR authority only.

Any attempt to forge or mutate evaluation scores from an application bridge returns a security violation and invalidates the session.

## 5. Explicit schema/runtime boundary

The schema rejects the five exact protected store names anywhere in nested `STATE_SNAPSHOT` data, using recursive `safeStateValue`. It does not prove the guest cannot encode a hidden key, issue a forged navigation request, or alter host storage. **An independently tested host bridge must enforce** the 65,536-byte serialized message size, depth 8, authenticated WindowProxy, cryptographic nonce, strict sequence, eligible navigation and protected-store isolation. These are not implemented by A60 schemas or its test-local helper functions. No production or learner admission is authorized.
