/**
 * `@pantoken/plugin-props-minify` — compose prune, flatten, and mangle transforms for
 * `--instui-*` custom properties via a single {@link applyMinify} utility.
 *
 * Each CSS-emitting pipeline (generate scripts, renderers) uses `applyMinify` for a consistent
 * minification surface without taking a direct PostCSS dependency.
 *
 * **Prune + mangle are only safe for self-contained bundles** where all `var(--instui-*)` references
 * and their definitions live in the same output. For separate-file consumers (`@pantoken/css` +
 * `@pantoken/components` loaded independently), apply `{ flatten: true }` only.
 *
 * **Mangle across file boundaries:** pass the same `Map` instance as
 * `mangle.sharedManifest` to every `applyMinify` call that processes CSS files loaded together.
 * Process the token sheet first (it seeds the manifest), then component sheets.
 *
 * @example Apply all three transforms to a self-contained bundle
 * ```ts
 * import { applyMinify } from "@pantoken/plugin-props-minify";
 * const out = applyMinify(css, { prune: true, flatten: true, mangle: true });
 * ```
 *
 * @example Flatten only (safe for separate-file consumers)
 * ```ts
 * import { applyMinify } from "@pantoken/plugin-props-minify";
 * const out = applyMinify(css, { flatten: true });
 * ```
 *
 * @example Mangle two files with the same mapping
 * ```ts
 * import { applyMinify } from "@pantoken/plugin-props-minify";
 * const manifest = new Map<string, string>();
 * const tokenCss = applyMinify(rawTokens, { mangle: { sharedManifest: manifest } });
 * const componentCss = applyMinify(rawComponents, { mangle: { sharedManifest: manifest } });
 * ```
 *
 * @module
 * @beta
 */
import postcss from "postcss";
import { pruneCustomProps } from "@pantoken/plugin-prune-custom-props";
import { flattenProperty, type FlattenPropertyOptions } from "@pantoken/plugin-flatten-property";
import {
  mangleCustomProps,
  type MangleCustomPropsOptions,
} from "@pantoken/plugin-mangle-custom-props";

export { pruneCustomProps } from "@pantoken/plugin-prune-custom-props";
export { flattenProperty } from "@pantoken/plugin-flatten-property";
export type { FlattenPropertyOptions } from "@pantoken/plugin-flatten-property";
export { mangleCustomProps } from "@pantoken/plugin-mangle-custom-props";
export type { MangleCustomPropsOptions, MangleMethod } from "@pantoken/plugin-mangle-custom-props";

/** Options for {@link applyMinify}. */
export interface PropsMinifyOptions {
  /**
   * Apply {@link pruneCustomProps} to tree-shake unused `--instui-*` tokens before other transforms.
   *
   * Only safe for self-contained bundles that contain both token definitions and the component
   * rules that reference them. Pruning a token-only sheet removes everything.
   *
   * @defaultValue `false`
   */
  prune?: boolean;
  /**
   * Apply {@link flattenProperty} to convert `@property` at-rules to plain declarations.
   *
   * `true` uses plugin defaults (`injectSelector: ":root"`, `onMissingInitialValue: "remove"`).
   * Pass a {@link FlattenPropertyOptions} object to override individual defaults.
   *
   * @defaultValue `false`
   */
  flatten?: boolean | FlattenPropertyOptions;
  /**
   * Apply {@link mangleCustomProps} to replace long `--instui-*` names with minimal identifiers.
   *
   * `true` uses plugin defaults (`prefix: "--instui-"`, `method: "base26"`).
   * Pass a {@link MangleCustomPropsOptions} object to override individual defaults — including
   * `sharedManifest` for cross-file coordination.
   *
   * Only safe for self-contained bundles. See module-level docs.
   *
   * @defaultValue `false`
   */
  mangle?: boolean | MangleCustomPropsOptions;
}

/**
 * Apply custom-property minification transforms to a stylesheet string.
 *
 * Builds a PostCSS plugin array from `options` and runs it synchronously. Plugin order:
 * `pruneCustomProps` → `flattenProperty` → `mangleCustomProps`. Returns the input unchanged when
 * no options are set.
 *
 * @param css - The stylesheet string to transform.
 * @param options - {@link PropsMinifyOptions}.
 * @returns The transformed CSS string.
 *
 * @example
 * ```ts
 * import { applyMinify } from "@pantoken/plugin-props-minify";
 * const out = applyMinify(css, { prune: true, flatten: true, mangle: true });
 * ```
 */
export function applyMinify(css: string, options: PropsMinifyOptions = {}): string {
  const { prune, flatten, mangle } = options;
  const plugins = [];

  // Order matters: prune first (fewer nodes to flatten), flatten before mangle.
  if (prune) plugins.push(pruneCustomProps());
  if (flatten) plugins.push(flattenProperty(flatten === true ? {} : flatten));
  if (mangle) plugins.push(mangleCustomProps(mangle === true ? {} : mangle));

  if (plugins.length === 0) return css;

  return postcss(plugins).process(css, { from: undefined }).css;
}
