/**
 * `@pantoken/vue` — a Vue plugin over `@pantoken/web-components`.
 *
 * `install` registers the custom elements and tells Vue's compiler to treat `instui-*` tags as
 * custom elements. `readToken` reads a resolved `--instui-*` value (SSR-safe).
 *
 * @module
 * @experimental
 */
import { register } from "@pantoken/web-components";

export { register, iconSvg } from "@pantoken/web-components";

/**
 * Read a resolved token value. Returns `fallback` on the server.
 *
 * @example
 * ```ts
 * import { readToken } from "@pantoken/vue";
 *
 * const brand = readToken("--instui-color-background-brand", "#0374B5");
 * ```
 */
export function readToken(name: string, fallback = ""): string {
  if (typeof document === "undefined") return fallback;
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
}

/** The subset of a Vue `App` this plugin touches. */
interface VueAppLike {
  config: { compilerOptions?: { isCustomElement?: (tag: string) => boolean } };
}

/**
 * The pantoken Vue plugin: `app.use(PantokenVue)`.
 *
 * @example
 * ```ts
 * import { createApp } from "vue";
 * import { PantokenVue } from "@pantoken/vue";
 * import "@pantoken/css";
 *
 * createApp(App).use(PantokenVue).mount("#app");
 * ```
 */
export const PantokenVue = {
  install(app: VueAppLike): void {
    register();
    const options = (app.config.compilerOptions ??= {});
    const previous = options.isCustomElement;
    options.isCustomElement = (tag: string): boolean =>
      tag.startsWith("instui-") || (previous?.(tag) ?? false);
  },
};

export default PantokenVue;
