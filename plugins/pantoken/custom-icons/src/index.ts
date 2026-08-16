/**
 * `@pantoken/plugin-custom-icons` — vendored custom icon glyphs for downstream consumers.
 *
 * Brings in icons that aren't part of the InstUI set (product/brand marks, etc.) as
 * `--instui-icon-<name>` image tokens — the same namespace and `.-icon-<name>` painter class the
 * built-in InstUI icons use, so a custom icon drops into `.instui-icon -icon-<name>` exactly like a
 * built-in one. No `custom-` prefix: on a name collision, the built-in InstUI icon should win (load
 * it after this plugin's CSS in any combine URL).
 *
 * @example
 * ```ts
 * import { toCss } from "@pantoken/css";
 * import { byTheme } from "@pantoken/tokens";
 * import { customIcons } from "@pantoken/plugin-custom-icons";
 *
 * const css = toCss(byTheme("rebrand"), { plugins: [customIcons({ names: ["highspot"] })] });
 * // adds --instui-icon-highspot as an <image> token
 * ```
 *
 * @module
 * @beta
 */
import { definePlugin } from "@pantoken/plugin-kit";
import { defineToken } from "@pantoken/model";
import type { PantokenPlugin, TokenInput } from "@pantoken/model";
import { ICONS } from "../generated/embedded.ts";

/** Metadata for one vendored custom icon. */
export interface CustomIcon {
  /** The icon name, e.g. `"highspot"` — also the `-icon-<name>` modifier suffix. */
  name: string;
  /** The raw SVG source. */
  svg: string;
}

/** Options for the {@link customIcons} plugin. */
export interface CustomIconsOptions {
  /** Icon names to emit as `<image>` tokens (default: all vendored icons). */
  names?: string[];
  /** The token-name prefix (default: `--instui-icon-`, matching the InstUI icon namespace). */
  prefix?: string;
}

/** Every vendored custom icon, sorted by name. */
export const icons: readonly CustomIcon[] = ICONS;

function toDataUri(svg: string): string {
  return `url('data:image/svg+xml;utf8,${encodeURIComponent(svg)}')`;
}

/**
 * Create the custom-icons plugin.
 *
 * @param options - {@link CustomIconsOptions}.
 * @returns A {@link PantokenPlugin} with a `tokens` hook.
 */
export function customIcons(options: CustomIconsOptions = {}): PantokenPlugin {
  const prefix = options.prefix ?? "--instui-icon-";
  const names = options.names ?? icons.map((i) => i.name);

  return definePlugin({
    name: "@pantoken/plugin-custom-icons",
    tokens: ({ tokens }) => {
      const additions: TokenInput[] = [];
      for (const name of names) {
        const icon = icons.find((i) => i.name === name);
        if (!icon) continue;
        additions.push({
          name: `${prefix}${name}`,
          value: toDataUri(icon.svg),
          syntax: "<image>",
          meta: { kind: "icon" },
        });
      }
      return [...tokens, ...additions.map((a) => defineToken(a))];
    },
  });
}

export default customIcons;
