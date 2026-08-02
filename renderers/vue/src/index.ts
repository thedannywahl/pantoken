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
import type { LocaleBundle } from "@pantoken/i18n";
import { registerLocalized } from "@pantoken/i18n";

export { register, iconSvg } from "@pantoken/web-components";
export { registerLocalized } from "@pantoken/i18n";

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
 * The pantoken Vue plugin: `app.use(PantokenVue)` or `app.use(PantokenVue, { locale: "hu" })`.
 *
 * @example
 * ```ts
 * import { createApp } from "vue";
 * import { PantokenVue } from "@pantoken/vue";
 * import "@pantoken/css";
 *
 * createApp(App).use(PantokenVue).mount("#app");
 * createApp(App).use(PantokenVue, { locale: "hu" }).mount("#app"); // localized
 * ```
 */
export const PantokenVue = {
  install(app: VueAppLike, options: { locale?: string | LocaleBundle } = {}): void {
    if (options.locale) registerLocalized(options.locale);
    else register();
    const compilerOptions = (app.config.compilerOptions ??= {});
    const previous = compilerOptions.isCustomElement;
    compilerOptions.isCustomElement = (tag: string): boolean =>
      tag.startsWith("instui-") || (previous?.(tag) ?? false);
  },
};

export default PantokenVue;
