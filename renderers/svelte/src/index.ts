/**
 * `@pantoken/svelte` — Svelte helpers over `@pantoken/web-components`.
 *
 * `icon` is a Svelte action that renders an Instructure glyph into an element. `readToken` reads a
 * resolved `--instui-*` value (SSR-safe). The custom elements also work directly once `register()`
 * has run.
 *
 * @module
 * @experimental
 */
import { iconSvg, register } from "@pantoken/web-components";

export { register } from "@pantoken/web-components";

/**
 * Read a resolved token value. Returns `fallback` on the server.
 *
 * @example
 * ```ts
 * import { readToken } from "@pantoken/svelte";
 *
 * const brand = readToken("--instui-color-background-brand", "#0374B5");
 * ```
 */
export function readToken(name: string, fallback = ""): string {
  if (typeof document === "undefined") return fallback;
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
}

/** A Svelte action's return shape. */
export interface ActionResult {
  update(name: string): void;
  destroy(): void;
}

/**
 * Svelte action: `<span use:icon={"arrow-left"} />` renders the icon's inline SVG into the node.
 *
 * @param node - The host element.
 * @param name - The icon name.
 *
 * @example
 * ```svelte
 * <script>
 *   import { icon } from "@pantoken/svelte";
 *   import "@pantoken/css";
 * </script>
 *
 * <span use:icon={"arrow-left"} />
 * ```
 */
export function icon(node: Element, name: string): ActionResult {
  const render = (iconName: string): void => {
    node.innerHTML = iconSvg(iconName);
  };
  register();
  render(name);
  return {
    update: render,
    destroy() {
      node.innerHTML = "";
    },
  };
}
