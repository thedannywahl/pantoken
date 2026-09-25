/**
 * The scope attribute contract — the single source of truth shared by the CSS emitter
 * (`@pantoken/css`, which selects on these) and the runtime (`@pantoken/scope`, which writes them).
 *
 * Its own module with zero imports, exposed at the `@pantoken/utils/scope` entry, so the browser
 * runtime can take the names without pulling `arkregex` or the resolver in behind the barrel.
 *
 * @module
 */

/** Attribute that roots a theme scope. Matches any element, not just `:root`. */
export const THEME_ATTR = "data-pantoken-theme";
/** Attribute that pins a subtree to a color scheme. */
export const SCHEME_ATTR = "data-pantoken-scheme";
/** Attribute that selects a custom brand color. */
export const COLOR_ATTR = "data-pantoken-color";
/** Attribute marking a scope that ancestor resolution must not cross. */
export const BOUNDARY_ATTR = "data-pantoken-boundary";
/** Attribute carrying the owning instance id, so sibling instances can tell scopes apart. */
export const INSTANCE_ATTR = "data-pantoken-instance";

/** Every attribute that participates in scope resolution. */
export const SCOPE_ATTRS = [
  THEME_ATTR,
  SCHEME_ATTR,
  COLOR_ATTR,
  BOUNDARY_ATTR,
  INSTANCE_ATTR,
] as const;

/** Cascade layers the scoped sheets emit into, in ascending precedence order. */
export const SCOPE_LAYERS = [
  "pantoken.base",
  "pantoken.theme",
  "pantoken.scheme",
  "pantoken.color",
] as const;

/** A color scheme a scope can be pinned to. */
export type Scheme = "light" | "dark";

const SCHEMES = new Set<string>(["light", "dark"]);

/** Narrow an arbitrary value to a {@link Scheme}. */
export function isScheme(value: unknown): value is Scheme {
  return typeof value === "string" && SCHEMES.has(value);
}

/**
 * Class equivalents of the scope attributes, for hosts that sanitize `data-*` but allow `class` —
 * Canvas RCE content being the one that forced them. They follow the repo's global-modifier naming
 * (`.--name`), and the emitter pairs each attribute selector with its class twin.
 */
export const themeClass = (theme: string): string => `--pantoken-theme-${theme}`;
/** Class equivalent of `data-pantoken-scheme`. */
export const schemeClass = (scheme: Scheme): string => `--pantoken-scheme-${scheme}`;
/** Class equivalent of `data-pantoken-color`. */
export const colorClass = (color: string): string => `--pantoken-color-${color}`;
/** Class equivalent of `data-pantoken-boundary`. */
export const BOUNDARY_CLASS = "--pantoken-boundary";

/** The selector matching any element that roots `theme`. */
export function themeScopeSelector(theme: string): string {
  return `[${THEME_ATTR}="${theme}"]`;
}

/** The selector matching any element pinned to `scheme`. */
export function schemeScopeSelector(scheme: Scheme): string {
  return `[${SCHEME_ATTR}="${scheme}"]`;
}

/** The selector matching any element using custom brand color `color`. */
export function colorScopeSelector(color: string): string {
  return `[${COLOR_ATTR}="${color}"]`;
}

// The class twin is repeated three times for (0,3,0) specificity, matching `globalModifierSelector`
// in ./utility-css.ts, so a scope class outranks any component-modifier compound that sets tokens.
const classSelector = (cls: string): string => `:where(*).${cls}.${cls}.${cls}`;

/** Both forms of the theme scope selector, as a selector list. */
export function themeScopeSelectors(theme: string): string {
  return `${themeScopeSelector(theme)}, ${classSelector(themeClass(theme))}`;
}

/** Both forms of the scheme scope selector, as a selector list. */
export function schemeScopeSelectors(scheme: Scheme): string {
  return `${schemeScopeSelector(scheme)}, ${classSelector(schemeClass(scheme))}`;
}

/** Both forms of the color scope selector, as a selector list. */
export function colorScopeSelectors(color: string): string {
  return `${colorScopeSelector(color)}, ${classSelector(colorClass(color))}`;
}
