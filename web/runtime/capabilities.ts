// Response Capability Registry for Grade9 platform runtime.
// Governs mounting, validation, offline declarations, and fallback safety across all 13 response kinds.
// Pure structural engine: No subject-specific dispatch or academic authorization.

import type { Capability, Validation } from './contracts.ts';
import type { Kind, Response, ResponseOf } from './types.ts';
import {
  RESPONSE_KINDS,
  validateResponse,
  ResponseValidationError,
  type ResponseKind,
  type ValidatedResponse,
} from './response.ts';

/**
 * Creates a safe DOM or headless-compatible mount handler.
 */
function createSafeMount(kind: Kind) {
  return (
    root: HTMLElement,
    value: Response | null,
    onChange: (r: Response) => void
  ): (() => void) => {
    if (root && typeof root.appendChild === 'function' && typeof document !== 'undefined') {
      const container = document.createElement('div');
      container.className = `g9-response-widget g9-kind-${kind.toLowerCase().replace(/_/g, '-')}`;
      container.setAttribute('data-capability-kind', kind);
      root.appendChild(container);

      return () => {
        if (container.parentNode) {
          container.parentNode.removeChild(container);
        }
      };
    }
    return () => {};
  };
}

/**
 * Normalizes input: if already an object with kind property, verifies kind matches;
 * otherwise wraps the raw value into { kind, value }.
 */
function normalizeAndValidate(kind: Kind, input: unknown): Response {
  if (typeof input === 'object' && input !== null && 'kind' in input) {
    const rawKind = (input as { kind: unknown }).kind;
    if (rawKind !== kind) {
      throw new ResponseValidationError(
        'KIND_MISMATCH',
        `Capability '${kind}' cannot validate response of kind '${String(rawKind)}'`
      );
    }
    return validateResponse(input);
  }

  // Raw value passed, wrap and validate
  return validateResponse({ kind, value: input });
}

/**
 * Creates a standard Capability implementation for a registered response kind.
 */
export function createStandardCapability<K extends Kind>(
  kind: K,
  options?: {
    supportsOffline?: boolean;
    customValidate?: (input: unknown) => Response;
  }
): Capability<K> {
  return {
    kind,
    supportsOffline: options?.supportsOffline ?? true,
    validate(input: unknown): Validation<ResponseOf<K>> {
      try {
        const candidate=options?.customValidate ? options.customValidate(input) : input;
        return {ok:true,value:normalizeAndValidate(kind,candidate) as ResponseOf<K>};
      } catch(e){return {ok:false,reasonCode:e instanceof ResponseValidationError?e.code:'INVALID_RESPONSE'};}
    },
    mount: (root,value,onChange)=>createSafeMount(kind)(root,value,onChange as (r:Response)=>void),
  };
}

/**
 * Creates an unsupported fallback capability that fails closed safely.
 */
export function createUnsupportedCapability(kind: string): Capability {
  return {
    kind: kind as Kind,
    supportsOffline: false,
    validate(): Validation<Response> { return {ok:false,reasonCode:'UNSUPPORTED_KIND'}; },
    mount(root: HTMLElement, value: Response | null, onChange: (r: Response) => void): () => void {
      if (root && typeof root.appendChild === 'function' && typeof document !== 'undefined') {
        const fallback = document.createElement('div');
        fallback.className = 'g9-unsupported-capability';
        fallback.setAttribute('data-unsupported-kind', kind);
        fallback.textContent = `Capability '${kind}' is not supported.`;
        root.appendChild(fallback);
        return () => {
          if (fallback.parentNode) {
            fallback.parentNode.removeChild(fallback);
          }
        };
      }
      return () => {};
    },
  };
}

/**
 * Capability Registry managing registered response handlers.
 * Guarantees safe fallbacks, zero subject-specific dispatch, and offline inspection.
 */
export class CapabilityRegistry {
  private readonly capabilities = new Map<string, Capability<Kind>>();

  constructor(initialCapabilities?: readonly Capability<Kind>[]) {
    if (initialCapabilities) {
      for (const cap of initialCapabilities) {
        this.register(cap);
      }
    }
  }

  register<K extends Kind>(cap: Capability<K>): void {
    this.capabilities.set(cap.kind, cap as unknown as Capability<Kind>);
  }

  unregister(kind: string): boolean {
    return this.capabilities.delete(kind);
  }

  get(kind: string): Capability<Kind> | undefined {
    return this.capabilities.get(kind);
  }

  has(kind: string): boolean {
    return this.capabilities.has(kind);
  }

  getOrFallback(kind: string): Capability<Kind> {
    const cap = this.capabilities.get(kind);
    if (cap) {
      return cap;
    }
    return createUnsupportedCapability(kind);
  }

  getAll(): readonly Capability<Kind>[] {
    return Array.from(this.capabilities.values());
  }

  getRegisteredKinds(): readonly string[] {
    return Array.from(this.capabilities.keys());
  }
}

/**
 * Build default registry populated with all 13 platform response capabilities.
 */
export function createDefaultCapabilityRegistry(): CapabilityRegistry {
  const registry = new CapabilityRegistry();

  for (const kind of RESPONSE_KINDS) {
    registry.register(createStandardCapability(kind));
  }

  return registry;
}

/**
 * Default global singleton capability registry.
 */
export const defaultCapabilityRegistry = createDefaultCapabilityRegistry();
