/**
 * `@pantoken/plugin-flatten-property` — convert `@property` at-rules to plain custom-property
 * declarations.
 *
 * `@property` at-rules register typed CSS custom properties with `syntax`, `inherits`, and
 * `initial-value` descriptors. They carry significant byte overhead — ~60 bytes of boilerplate per
 * property — and are unnecessary when the stylesheet is a self-contained bundle where type
 * registration provides no runtime benefit. This plugin replaces each `@property` block with a
 * simple `--name: value` declaration inside a chosen selector, recovering all that overhead.
 *
 * **Semantic note:** removing `@property` loses CSS type registration. Typed transitions/animations,
 * `@starting-style`, and the CSS Typed OM depend on it. Only apply to bundles where those semantics
 * are not needed.
 *
 * @example
 * ```ts
 * import postcss from "postcss";
 * import { flattenProperty } from "@pantoken/plugin-flatten-property";
 * const out = postcss([flattenProperty()]).process(css, { from: undefined }).css;
 * ```
 *
 * @module
 * @beta
 */
import type { Plugin } from "postcss";

/** Options for {@link flattenProperty}. */
export interface FlattenPropertyOptions {
  /**
   * The selector of the rule that receives the extracted `--name: value` declarations.
   *
   * @defaultValue `":root"`
   */
  injectSelector?: string;
  /**
   * What to do with an `@property` at-rule that has no `initial-value` descriptor.
   *
   * - `"remove"` — drop the at-rule (default).
   * - `"keep"` — leave it in the output untouched.
   *
   * @defaultValue `"remove"`
   */
  onMissingInitialValue?: "remove" | "keep";
}

/**
 * Create the flatten-`@property` PostCSS plugin.
 *
 * Walks all `@property` at-rules in the stylesheet, extracts each `initial-value` descriptor, removes
 * the at-rule, and prepends a single `injectSelector { --name: value; … }` rule containing all
 * extracted declarations. Empty rules and `@layer` blocks left behind after removal are dropped.
 *
 * @param options - {@link FlattenPropertyOptions}.
 * @returns A PostCSS {@link Plugin}.
 *
 * @example Default injection into :root
 * ```ts
 * import postcss from "postcss";
 * import { flattenProperty } from "@pantoken/plugin-flatten-property";
 *
 * const out = postcss([flattenProperty()]).process(css, { from: undefined }).css;
 * ```
 *
 * @example Inject into :scope (for use inside scope blocks)
 * ```ts
 * import postcss from "postcss";
 * import { flattenProperty } from "@pantoken/plugin-flatten-property";
 *
 * const out = postcss([flattenProperty({ injectSelector: ":scope" })]).process(css, { from: undefined }).css;
 * ```
 *
 * @example Preserve @property rules without initial-value
 * ```ts
 * import postcss from "postcss";
 * import { flattenProperty } from "@pantoken/plugin-flatten-property";
 *
 * const out = postcss([flattenProperty({ onMissingInitialValue: "keep" })]).process(css, { from: undefined }).css;
 * ```
 */
export const flattenProperty: {
  (options?: FlattenPropertyOptions): Plugin;
  /** Required PostCSS plugin marker. */
  postcss: true;
} = Object.assign(
  function flattenProperty(options: FlattenPropertyOptions = {}): Plugin {
    const { injectSelector = ":root", onMissingInitialValue = "remove" } = options;
    return {
      postcssPlugin: "pantoken-flatten-property",
      OnceExit(root, { postcss }) {
        const collected = new Map<string, string>();
        const toRemove: import("postcss").AtRule[] = [];

        root.walkAtRules("property", (rule) => {
          const name = rule.params.trim();
          let initialValue: string | undefined;

          rule.walkDecls("initial-value", (decl) => {
            initialValue = decl.value.trim();
          });

          if (initialValue === undefined) {
            if (onMissingInitialValue === "remove") toRemove.push(rule);
            return;
          }

          collected.set(name, initialValue);
          toRemove.push(rule);
        });

        for (const rule of toRemove) rule.remove();

        // Drop at-rules and rules emptied by removal.
        root.walkAtRules((rule) => {
          if (rule.nodes?.length === 0) rule.remove();
        });
        root.walkRules((rule) => {
          if (rule.nodes?.length === 0) rule.remove();
        });

        if (collected.size === 0) return;

        const decls = [...collected.entries()].map(([name, value]) =>
          postcss.decl({ prop: name, value }),
        );
        const injected = postcss.rule({ selector: injectSelector, nodes: decls });
        root.prepend(injected);
      },
    };
  },
  { postcss: true as const },
);
