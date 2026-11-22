# Legacy source candidate port

`source-port.generated.ts` was generated from pinned v3.5/v4.1 source objects.
It exports `portedSourceResources`, `portedSubjectDetails`, and `portedSourceAuthority`.
Everything is `HOLD`, internal, not learner-routable, and not qualified.

The module is intentionally NOT wired into `main.ts` or auto-registered with public
resource/assessment/search services. An internal diagnostic developer mount may
import it; native learner route, parity and authentication are subsequent tasks.
The full original source and private question records remain in the separate
local compatibility port (not in this Git checkout).

Do not push or ship this module as a learner release without a separate decision.
