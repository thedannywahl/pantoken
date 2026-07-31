/**
 * Package-local PostCSS plugin: wrap the stylesheet in a CSS `@scope (selector)` at-rule so guide
 * styles can't leak onto the host page. Top-level `@property` registrations are hoisted out of the
 * scope because `@property` is not valid inside `@scope`. `@layer` order statements stay inside the
 * scope — they establish cascade order for the scoped layers, not for global document layers.
 * Scoped to `@pantoken/pendo` — a Pendo deployment concern.
 *
 * Mirrors `@instructure/postcss-add-scope` from pendo-styles.
 *
 * @module
 */
import type { ChildNode, Plugin } from "postcss";

/** Options for {@link addScope}. */
export interface AddScopeOptions {
  /** The scope root selector (default `._pendo-step-container`). */
  selector?: string;
}

/**
 * Create the `@scope` wrapping plugin.
 *
 * @example
 * ```ts
 * import postcss from "postcss";
 * import { addScope } from "@pantoken/pendo";
 *
 * const { css } = postcss([addScope({ selector: "._pendo-step-container" })])
 *   .process(".x{color:red}", { from: undefined });
 * // "@scope (._pendo-step-container) { .x{color:red} }"
 * ```
 */
export const addScope: {
  (options?: AddScopeOptions): Plugin;
  /** Required PostCSS plugin marker. */
  postcss: true;
} = Object.assign(
  function addScope(options: AddScopeOptions = {}): Plugin {
    const selector = options.selector ?? "._pendo-step-container";
    return {
      postcssPlugin: "pendo-add-scope",
      OnceExit(root, { AtRule }) {
        const scope = new AtRule({
          name: "scope",
          params: `(${selector})`,
          raws: { afterName: " ", between: " " },
        });
        const hoisted: ChildNode[] = [];
        const moved: ChildNode[] = [];
        for (const node of root.nodes) {
          // @property is invalid inside @scope and must be hoisted to the document root.
          const property = node.type === "atrule" && node.name === "property";
          (property ? hoisted : moved).push(node.clone());
        }
        root.removeAll();
        for (const node of hoisted) root.append(node);
        for (const node of moved) scope.append(node);
        root.append(scope);
      },
    };
  },
  { postcss: true as const },
);

export default addScope;
