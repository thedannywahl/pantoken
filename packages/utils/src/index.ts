/**
 * `@pantoken/utils` — shared, upstream-free helpers used across the pantoken packages: the token
 * reference resolver (with `light-dark()` handling), the two token regexes (typed via `arkregex`),
 * kebab→camel case, hex-colour parsing, SVG sanitization, the pantoken spacing scale, reference-drift
 * validation, and the generic token→utility-class emitters that both `@pantoken/components`
 * (semantic tier) and `@pantoken/plugin-primitives` (raw-palette tier) build on. Depends only on
 * `@pantoken/model` (types) + `arkregex`, so any package can use it without pulling the GitHub-only
 * upstream.
 *
 * The css-tree-backed token syntax validator lives at the separate `@pantoken/utils/token-syntax`
 * entry, not this barrel — `css-tree` bundles a runtime `createRequire()` JSON load that breaks when
 * pulled into a browser/SSR bundle, and this barrel is imported by browser-facing packages (e.g.
 * `@pantoken/components`) for the Node-free helpers above.
 *
 * A pure barrel — every implementation lives in its own discrete module; add new helpers there and
 * re-export them here, don't grow this file.
 *
 * @module
 * @beta
 */

// The elevation + focus-outline composite custom-property builders. They live in their own module (no
// `arkregex`/resolver deps) so `@pantoken/css` can pull just the declarations without the rest of utils.
export {
  ELEVATION_NAMES,
  elevationDeclarations,
  FOCUSABLE_SELECTOR,
  focusOutlineDeclarations,
  focusOutlineRules,
} from "./declarations.ts";

// The token reference resolver: expands `var(--x)` chains, with optional `light-dark()` collapsing.
export { LIGHT_DARK_RE, VAR_RE, makeResolver, resolveTokens } from "./resolver.ts";
export type { Mode, ResolveOptions } from "./resolver.ts";

// Reference-integrity validation: drift vs. the source IR, and dangling `var()` refs.
export { danglingReferences, extractInstuiRefs, tokenNames, unknownReferences } from "./drift.ts";

// kebab-case → camelCase.
export { camelCase } from "./case.ts";

// Hex-colour parsing.
export { parseHexColor } from "./color.ts";
export type { Rgba } from "./color.ts";

// SVG sanitization for glyphs decoded from vendored data URIs or contributed by plugins.
export { sanitizeSvg } from "./svg.ts";

// The pantoken spacing scale — shared by `@pantoken/components` and `@pantoken/interactions`.
export { SPACING_AUTO_STEP, SPACING_STEPS } from "./spacing.ts";
export type { SpacingStep } from "./spacing.ts";

// Token → utility-class emitters (semantic colour + generic one-token-one-property families).
export { colorUtilitiesCss, tokenUtilitiesCss } from "./utility-css.ts";
export type {
  ColorUtilityEntry,
  ColorUtilityNames,
  TokenUtilityGroup,
  UtilityOptions,
} from "./utility-css.ts";
