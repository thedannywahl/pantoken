/**
 * `@pantoken/astro` — Astro / Starlight integration for pantoken.
 *
 * {@link InstUI} is a Starlight plugin that injects the pantoken stylesheet (and any plugin CSS,
 * e.g. a focus ring) into the page head. It ports the approach of `starlight-theme-instui` onto the
 * shared `@pantoken/css` pipeline, so it no longer carries its own token resolver.
 *
 * @module
 */
import { toCss } from "@pantoken/css";
import { byTheme } from "@pantoken/tokens";
import type { PantokenPlugin, Theme } from "@pantoken/model";

/** A minimal structural type for a Starlight head entry (avoids a hard dependency on Starlight). */
export interface HeadEntry {
  tag: "style";
  attrs: Record<string, string>;
  content: string;
}

/** A minimal structural type for a Starlight plugin. */
export interface StarlightPluginLike {
  name: string;
  hooks: {
    "config:setup"(context: {
      config: { head?: HeadEntry[] };
      updateConfig(patch: { head: HeadEntry[] }): void;
      logger?: { info(msg: string): void };
    }): void;
  };
}

/** Options for {@link InstUI}. */
export interface InstUIOptions {
  /** The theme to emit (default: `"rebrand"`). */
  theme?: Theme;
  /** Plugins whose `css` hooks contribute to the injected stylesheet (default: none). */
  plugins?: readonly PantokenPlugin[];
}

/**
 * Build the pantoken stylesheet for a theme (with optional plugin CSS). Exposed for direct use.
 *
 * @param options - {@link InstUIOptions}.
 * @returns The CSS string.
 *
 * @example
 * ```ts
 * import { pantokenCss } from "@pantoken/astro";
 *
 * const css = pantokenCss({ theme: "canvas" });
 * ```
 */
export function pantokenCss(options: InstUIOptions = {}): string {
  const { theme = "rebrand", plugins = [] } = options;
  return toCss(byTheme(theme), { plugins });
}

/**
 * Create the pantoken Starlight plugin.
 *
 * @param options - {@link InstUIOptions}.
 * @returns A Starlight plugin that injects the pantoken stylesheet into the page head.
 *
 * @example astro.config.mjs
 * ```ts
 * import starlight from "@astrojs/starlight";
 * import { InstUI } from "@pantoken/astro";
 * import { transition } from "@pantoken/plugin-transition";
 *
 * export default defineConfig({
 *   integrations: [
 *     starlight({
 *       title: "Docs",
 *       plugins: [InstUI({ theme: "rebrand", plugins: [transition()] })],
 *     }),
 *   ],
 * });
 * ```
 */
export function InstUI(options: InstUIOptions = {}): StarlightPluginLike {
  const css = pantokenCss(options);
  return {
    name: "@pantoken/astro",
    hooks: {
      "config:setup": (context) => {
        context.updateConfig({
          head: [
            ...(context.config.head ?? []),
            { tag: "style", attrs: { "data-pantoken": "base" }, content: css },
          ],
        });
        context.logger?.info(
          `pantoken: injected ${options.theme ?? "rebrand"} tokens (${css.length} bytes)`,
        );
      },
    },
  };
}

export default InstUI;
