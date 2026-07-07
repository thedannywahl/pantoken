/**
 * Package-local PostCSS plugin: wrap the stylesheet in a CSS `@scope (selector)` at-rule so guide
 * styles can't leak onto the host page. Top-level `@property` registrations and bare `@layer` order
 * statements are hoisted out of the scope (they're global by nature and `@property` isn't valid
 * inside `@scope`). Scoped to `@pantoken/pendo` — a Pendo deployment concern.
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
export function addScope(options: AddScopeOptions = {}): Plugin {
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
        // @property is global and invalid inside @scope; bare `@layer a, b;` sets global order.
        const bareLayer = node.type === "atrule" && node.name === "layer" && !node.nodes;
        const property = node.type === "atrule" && node.name === "property";
        (property || bareLayer ? hoisted : moved).push(node.clone());
      }
      root.removeAll();
      for (const node of hoisted) root.append(node);
      for (const node of moved) scope.append(node);
      root.append(scope);
    },
  };
}
addScope.postcss = true;

export default addScope;
