/**
 * `@pantoken/vite` — a Vite plugin for pantoken.
 *
 * It exposes two virtual modules so apps consume tokens without importing the large packages
 * directly, and can auto-inject the stylesheet into the HTML entry:
 *
 * - `virtual:pantoken/css` — the stylesheet string (default export).
 * - `virtual:pantoken/tokens` — the resolved token IR (`tokens` named + default export).
 *
 * @module
 * @experimental
 */
import { css } from "@pantoken/css";
import { tokens } from "@pantoken/tokens";
import type { Plugin } from "vite";

const CSS_ID = "virtual:pantoken/css";
const TOKENS_ID = "virtual:pantoken/tokens";
const resolved = (id: string): string => `\0${id}`;

/** Options for the {@link pantoken} Vite plugin. */
export interface PantokenViteOptions {
  /** Inject the stylesheet into the HTML entry's `<head>` (default: false). */
  injectCss?: boolean;
}

/**
 * The pantoken Vite plugin.
 *
 * @param options - {@link PantokenViteOptions}.
 * @returns A Vite {@link Plugin}.
 *
 * @example Register the plugin in vite.config.ts
 * ```ts
 * import { defineConfig } from "vite";
 * import { pantoken } from "@pantoken/vite";
 *
 * export default defineConfig({
 *   plugins: [pantoken()],
 * });
 * ```
 *
 * @example Auto-inject the stylesheet into the HTML <head>
 * ```ts
 * import { defineConfig } from "vite";
 * import { pantoken } from "@pantoken/vite";
 *
 * export default defineConfig({
 *   // No need to import `virtual:pantoken/css` yourself — it's injected.
 *   plugins: [pantoken({ injectCss: true })],
 * });
 * ```
 *
 * @example Consume the virtual modules in app code
 * ```ts
 * import css from "virtual:pantoken/css"; // the stylesheet string
 * import { tokens } from "virtual:pantoken/tokens"; // the resolved token IR
 * ```
 */
export function pantoken(options: PantokenViteOptions = {}): Plugin {
  return {
    name: "@pantoken/vite",
    resolveId(id) {
      if (id === CSS_ID || id === TOKENS_ID) return resolved(id);
      return null;
    },
    load(id) {
      if (id === resolved(CSS_ID)) return `export default ${JSON.stringify(css)};`;
      if (id === resolved(TOKENS_ID)) {
        return `export const tokens = ${JSON.stringify(tokens)};\nexport default tokens;`;
      }
      return null;
    },
    transformIndexHtml(html) {
      if (!options.injectCss) return html;
      return {
        html,
        tags: [
          {
            tag: "style",
            attrs: { "data-pantoken": "css" },
            children: css,
            injectTo: "head" as const,
          },
        ],
      };
    },
  };
}

export default pantoken;
