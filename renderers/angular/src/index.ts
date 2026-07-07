/**
 * `@pantoken/angular` — Angular helpers over `@pantoken/web-components`.
 *
 * Call {@link registerPantokenElements} during bootstrap, and add `CUSTOM_ELEMENTS_SCHEMA` to the
 * component/module that uses `<instui-icon>`. {@link readToken} reads a resolved `--instui-*` value.
 *
 * @module
 */
import { register } from "@pantoken/web-components";

export { register } from "@pantoken/web-components";

/**
 * Register the pantoken custom elements (call once during app bootstrap).
 *
 * @example
 * ```ts
 * import { registerPantokenElements } from "@pantoken/angular";
 * import "@pantoken/css";
 *
 * registerPantokenElements(); // during app bootstrap
 * // Add CUSTOM_ELEMENTS_SCHEMA to the component/module that uses <instui-icon>.
 * ```
 */
export function registerPantokenElements(): void {
  register();
}

/**
 * Read a resolved token value. Returns `fallback` on the server.
 *
 * @example
 * ```ts
 * import { readToken } from "@pantoken/angular";
 *
 * const brand = readToken("--instui-color-background-brand", "#0374B5");
 * ```
 */
export function readToken(name: string, fallback = ""): string {
  if (typeof document === "undefined") return fallback;
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
}
