/**
 * `@pantoken/scope` — run several pantoken themes and color schemes in one document.
 *
 * Pantoken's CSS keys themes to a `data-pantoken-theme` attribute that matches *any* element, not
 * just `:root`, so theming is a property of a subtree rather than of the page. This package is the
 * runtime half of that contract:
 *
 * - {@link resolveScope} walks up from an element to find the theme, scheme, and color in effect —
 *   the auto-detection half.
 * - {@link createScope} declares a scope explicitly, with its own persisted state and its own frame
 *   message channel — the manual-configuration half that stops two instances colliding.
 * - {@link ensureProperties} injects the document-global `@property` registrations once, however
 *   many instances ask for them.
 *
 * Node-free by design: this ships to the browser.
 *
 * @module
 * @beta
 */
export {
  BOUNDARY_ATTR,
  COLOR_ATTR,
  DEFAULT_INSTANCE,
  INSTANCE_ATTR,
  SCHEME_ATTR,
  SCOPE_ATTRS,
  THEME_ATTR,
  isScheme,
} from "./contract.ts";
export type { ResolvedScope, Scheme, ScopeConfig } from "./contract.ts";

export { resolveInstance, resolveScheme, resolveScope } from "./resolve.ts";

export { connectScope, createScope, getScope } from "./scope.ts";
export type {
  ConnectScopeOptions,
  CreateScopeOptions,
  PantokenScope,
  ScopeMessage,
} from "./scope.ts";

export { ensureProperties, hasProperties } from "./inject.ts";

export { observeScope } from "./observe.ts";
