/**
 * `@pantoken/plugin-visual-debug` — the CSS for InstUI's `withVisualDebug` prop.
 *
 * InstUI's layout primitives (View, Flex, Grid, List, …) take `withVisualDebug` to outline the box
 * and its children while debugging a layout. This plugin emits a single dash-prefixed modifier,
 * `-with-visual-debug`, that works on any element (compound with any base — `.instui-view
 * -with-visual-debug`). The outline colour is a `--pantoken-visual-debug-color` custom property
 * (default a bright magenta) so it's easy to retint.
 *
 * @example
 * ```ts
 * import { toCss } from "@pantoken/css";
 * import { byTheme } from "@pantoken/tokens";
 * import { visualDebug } from "@pantoken/plugin-visual-debug";
 *
 * const css = toCss(byTheme("rebrand"), { plugins: [visualDebug()] });
 * // <div class="instui-view -with-visual-debug">…</div>
 * ```
 *
 * @module
 */
import { definePlugin } from "@pantoken/plugin-kit";
import type { PantokenPlugin } from "@pantoken/model";

/** Options for the {@link visualDebug} plugin. */
export interface VisualDebugOptions {
  /** The debug outline colour (default: a bright magenta via `--pantoken-visual-debug-color`). */
  color?: string;
  /** Where the rules land relative to the stylesheet: `"append"` (default) or `"prepend"`. */
  position?: "append" | "prepend";
}

/**
 * Create the visual-debug plugin.
 *
 * @param options - {@link VisualDebugOptions}.
 * @returns A {@link PantokenPlugin} with a `css` hook.
 */
export function visualDebug(options: VisualDebugOptions = {}): PantokenPlugin {
  const color = options.color ?? "var(--pantoken-visual-debug-color, #f42272)";
  const position = options.position ?? "append";
  const rules = [
    `.-with-visual-debug { outline: 0.0625rem solid ${color}; }`,
    // Outline the immediate children too, so the box's layout is visible at a glance.
    `.-with-visual-debug > * { outline: 0.0625rem dashed ${color}; }`,
  ].join("\n");

  return definePlugin({
    name: "@pantoken/plugin-visual-debug",
    css: () => ({ marker: "pantoken:visual-debug", [position]: rules }),
  });
}

export default visualDebug;
