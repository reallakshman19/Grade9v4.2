/**
 * web/components/navigation.ts
 * A21 – Navigation component contracts
 *
 * Defines the navigation drawer, tab bar, and back-stack contracts for the
 * Grade9 tablet app shell. All interactive elements must meet the 48px
 * minimum hit target. No page overflow on any supported viewport.
 *
 * No academic approval inferred from software validation.
 */

import { HIT_TARGET_MIN_PX, HIT_TARGET_PRIMARY_PX } from "../styles/tokens.ts";

// ---------------------------------------------------------------------------
// Route descriptors
// ---------------------------------------------------------------------------

export interface NavRoute {
  readonly id: string;
  readonly path: string;
  readonly label: string;
  readonly icon: string;
  readonly requiresAuth: boolean;
}

// ---------------------------------------------------------------------------
// Navigation state
// ---------------------------------------------------------------------------

export type DrawerState = "OPEN" | "CLOSED" | "PEEK";
export type NavMode = "DRAWER" | "RAIL" | "BAR";

export interface NavigationState {
  readonly mode: NavMode;
  readonly drawerState: DrawerState;
  readonly activeRouteId: string | null;
  readonly backStack: readonly string[];
  readonly focusedItemId: string | null;
}

// ---------------------------------------------------------------------------
// Navigation events
// ---------------------------------------------------------------------------

export type NavigationEventType =
  | "ROUTE_PUSH"
  | "ROUTE_REPLACE"
  | "ROUTE_POP"
  | "DRAWER_OPEN"
  | "DRAWER_CLOSE"
  | "DRAWER_PEEK"
  | "FOCUS_SET"
  | "BACK_PRESS";

export interface NavigationEvent {
  readonly type: NavigationEventType;
  readonly routeId?: string;
  readonly itemId?: string;
}

// ---------------------------------------------------------------------------
// Hit target contract
// ---------------------------------------------------------------------------

export interface NavItem {
  readonly id: string;
  readonly label: string;
  readonly icon: string;
  readonly routeId: string;
  readonly disabled: boolean;
  /** Rendered touch target dimensions in px. Must be ≥ HIT_TARGET_MIN_PX. */
  readonly hitTargetW: number;
  readonly hitTargetH: number;
}

export function validateNavItem(item: NavItem): string | null {
  if (item.hitTargetW < HIT_TARGET_MIN_PX || item.hitTargetH < HIT_TARGET_MIN_PX) {
    return `Nav item "${item.label}" hit target ${item.hitTargetW}×${item.hitTargetH}px below ${HIT_TARGET_MIN_PX}px minimum`;
  }
  return null;
}

// ---------------------------------------------------------------------------
// Navigation controller
// ---------------------------------------------------------------------------

export class NavigationController {
  private state: NavigationState;
  private readonly routes: Map<string, NavRoute>;
  private readonly eventLog: NavigationEvent[] = [];

  constructor(routes: readonly NavRoute[], initialMode: NavMode = "DRAWER") {
    this.routes = new Map(routes.map(r => [r.id, r]));
    this.state = {
      mode: initialMode,
      drawerState: "CLOSED",
      activeRouteId: null,
      backStack: [],
      focusedItemId: null,
    };
  }

  getState(): NavigationState {
    return this.state;
  }

  // -------------------------------------------------------------------------
  // Route navigation
  // -------------------------------------------------------------------------

  push(routeId: string): void {
    if (!this.routes.has(routeId)) {
      throw new Error(`Unknown route: ${routeId}`);
    }
    const prev = this.state.activeRouteId;
    this.state = {
      ...this.state,
      activeRouteId: routeId,
      backStack: prev !== null ? [...this.state.backStack, prev] : [...this.state.backStack],
    };
    this.eventLog.push({ type: "ROUTE_PUSH", routeId });
  }

  replace(routeId: string): void {
    if (!this.routes.has(routeId)) {
      throw new Error(`Unknown route: ${routeId}`);
    }
    this.state = { ...this.state, activeRouteId: routeId };
    this.eventLog.push({ type: "ROUTE_REPLACE", routeId });
  }

  pop(): boolean {
    if (this.state.backStack.length === 0) return false;
    const stack = [...this.state.backStack];
    const prev = stack.pop()!;
    this.state = { ...this.state, activeRouteId: prev, backStack: stack };
    this.eventLog.push({ type: "ROUTE_POP" });
    return true;
  }

  canGoBack(): boolean {
    return this.state.backStack.length > 0;
  }

  // -------------------------------------------------------------------------
  // Drawer
  // -------------------------------------------------------------------------

  openDrawer(): void {
    this.state = { ...this.state, drawerState: "OPEN" };
    this.eventLog.push({ type: "DRAWER_OPEN" });
  }

  closeDrawer(): void {
    this.state = { ...this.state, drawerState: "CLOSED" };
    this.eventLog.push({ type: "DRAWER_CLOSE" });
  }

  peekDrawer(): void {
    this.state = { ...this.state, drawerState: "PEEK" };
    this.eventLog.push({ type: "DRAWER_PEEK" });
  }

  // -------------------------------------------------------------------------
  // Focus management (keyboard/touch parity)
  // -------------------------------------------------------------------------

  setFocus(itemId: string): void {
    this.state = { ...this.state, focusedItemId: itemId };
    this.eventLog.push({ type: "FOCUS_SET", itemId });
  }

  clearFocus(): void {
    this.state = { ...this.state, focusedItemId: null };
  }

  // -------------------------------------------------------------------------
  // Mode switching
  // -------------------------------------------------------------------------

  setMode(mode: NavMode): void {
    this.state = { ...this.state, mode };
  }

  // -------------------------------------------------------------------------
  // Events
  // -------------------------------------------------------------------------

  getEventLog(): readonly NavigationEvent[] {
    return [...this.eventLog];
  }
}

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------

export function createNavigationController(
  routes: readonly NavRoute[],
  mode?: NavMode
): NavigationController {
  return new NavigationController(routes, mode);
}
