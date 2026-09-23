/**
 * Ancestor resolution — the "auto-detect inheritance" half of multi-instance support.
 *
 * Each scope attribute resolves independently: a subtree can override the color scheme while still
 * inheriting the theme from an ancestor, which is what the CSS does too (separate cascade layers,
 * separate attributes). Resolution stops at the first `data-pantoken-boundary` element, and never
 * crosses a shadow root — a shadow root is an implicit boundary.
 *
 * @module
 */
import {
  BOUNDARY_ATTR,
  COLOR_ATTR,
  DEFAULT_INSTANCE,
  INSTANCE_ATTR,
  SCHEME_ATTR,
  THEME_ATTR,
  isScheme,
} from "./contract.ts";
import type { ResolvedScope, Scheme } from "./contract.ts";

function attr(el: Element, name: string): string | undefined {
  const value = el.getAttribute(name);
  return value === null || value === "" ? undefined : value;
}

/**
 * Resolve the scope in effect for `start` by walking up its ancestors.
 *
 * @param start - The element to resolve for. Its own attributes participate.
 * @returns The {@link ResolvedScope}; fields no ancestor declared are left `undefined`.
 *
 * @example
 * ```ts
 * import { resolveScope } from "@pantoken/scope";
 *
 * // <div data-pantoken-theme="canvas"><span id="x"></span></div>
 * resolveScope(document.querySelector("#x")!).theme; // "canvas"
 * ```
 */
export function resolveScope(start: Element | null): ResolvedScope {
  let theme: string | undefined;
  let scheme: Scheme | undefined;
  let color: string | undefined;
  let instanceId: string | undefined;
  let element: Element | null = null;
  let bounded = false;

  for (let el: Element | null = start; el; el = el.parentElement) {
    let declared = false;

    const nextTheme = attr(el, THEME_ATTR);
    if (theme === undefined && nextTheme !== undefined) {
      theme = nextTheme;
      declared = true;
    }
    const nextScheme = attr(el, SCHEME_ATTR);
    if (scheme === undefined && isScheme(nextScheme)) {
      scheme = nextScheme;
      declared = true;
    }
    const nextColor = attr(el, COLOR_ATTR);
    if (color === undefined && nextColor !== undefined) {
      color = nextColor;
      declared = true;
    }
    const nextInstance = attr(el, INSTANCE_ATTR);
    if (instanceId === undefined && nextInstance !== undefined) {
      instanceId = nextInstance;
      declared = true;
    }

    if (declared && element === null) element = el;

    // The boundary element's own attributes count; nothing above it does.
    if (el.hasAttribute(BOUNDARY_ATTR)) {
      bounded = true;
      break;
    }
  }

  return { theme, scheme, color, instanceId, element, bounded };
}

/**
 * The instance that owns `start`, falling back to {@link DEFAULT_INSTANCE}.
 *
 * Use this to decide whether an event or message is yours before acting on it.
 */
export function resolveInstance(start: Element | null): string {
  return resolveScope(start).instanceId ?? DEFAULT_INSTANCE;
}

/**
 * The effective color scheme for `start`: an explicit pin if any ancestor set one, otherwise the
 * `color-scheme` the element actually computes to, otherwise the OS preference.
 *
 * Never reads `document.documentElement` — that global read is exactly what desynchronises two
 * instances on one page.
 */
export function resolveScheme(start: Element | null): Scheme {
  const pinned = resolveScope(start).scheme;
  if (pinned) return pinned;

  const view = start?.ownerDocument?.defaultView;
  if (start && view) {
    const computed = view.getComputedStyle(start).colorScheme;
    // `color-scheme` can be a list (`"light dark"`); only a single explicit value is a pin.
    if (computed === "dark") return "dark";
    if (computed === "light") return "light";
  }
  return view?.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
