/**
 * The attribute contract, re-exported from `@pantoken/utils/scope` — the dependency-free entry that
 * `@pantoken/css` selects on and this runtime writes. One definition, two consumers.
 *
 * @module
 */
export {
  BOUNDARY_ATTR,
  BOUNDARY_CLASS,
  COLOR_ATTR,
  INSTANCE_ATTR,
  SCHEME_ATTR,
  SCOPE_ATTRS,
  SCOPE_LAYERS,
  THEME_ATTR,
  colorClass,
  colorScopeSelector,
  isScheme,
  schemeClass,
  schemeScopeSelector,
  themeClass,
  themeScopeSelector,
} from "@pantoken/utils/scope";
export type { Scheme } from "@pantoken/utils/scope";

import type { Scheme } from "@pantoken/utils/scope";

/** The resolvable state of a scope. Every field is optional — an unset field inherits. */
export interface ScopeConfig {
  /** Theme key, e.g. `"rebrand"`. Matched by `[data-pantoken-theme="…"]`. */
  theme?: string;
  /** Pinned color scheme. Omit to follow the OS preference. */
  scheme?: Scheme;
  /** Custom brand color key. */
  color?: string;
  /** Identifier of the pantoken instance that owns this scope. */
  instanceId?: string;
}

/** A {@link ScopeConfig} resolved against the DOM, plus where each part came from. */
export interface ResolvedScope extends ScopeConfig {
  /** The nearest element that declared any scope attribute, or `null` when none did. */
  element: Element | null;
  /** True when resolution stopped at a `data-pantoken-boundary` element. */
  bounded: boolean;
}

/** The default instance id, used when a scope does not name one. */
export const DEFAULT_INSTANCE = "pantoken";
