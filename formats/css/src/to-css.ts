/**
 * `toCss` — turn the token IR into CSS: concrete tokens become typed `@property` registrations,
 * themed/reference tokens become scoped declarations. Plugins can contribute or post-process CSS.
 *
 * @module
 */
import { checkPlugins } from "@pantoken/plugin-kit";
import { buildCssFile } from "./emit.ts";
import type { CssContribution, PantokenPlugin, PropertyRule, Token } from "@pantoken/model";

/** True when a value cannot be a typed `@property` initial-value (`var()` / `light-dark()`). */
function isContextual(value: string): boolean {
  return /var\(|light-dark\(/.test(value);
}

/** Options for {@link toCss}. */
export interface ToCssOptions {
  /** The selector scoped declarations are emitted under (default `":root"`). */
  scope?: string;
  /** Plugins whose `css` hooks run after the base CSS is built (default: none). */
  plugins?: readonly PantokenPlugin[];
}

function marked(marker: string | undefined, css: string): string {
  return marker ? `/* ${marker} */\n${css}` : css;
}

/**
 * Emit CSS for a token IR.
 *
 * @param tokens - The IR (e.g. from `@pantoken/tokens`).
 * @param options - {@link ToCssOptions}.
 * @returns The CSS string.
 *
 * @example Build the default stylesheet
 * ```ts
 * import { toCss } from "@pantoken/css";
 * import { tokens } from "@pantoken/tokens";
 *
 * const stylesheet = toCss(tokens); // declarations under :root
 * ```
 *
 * @example Scope declarations to a class and build another theme
 * ```ts
 * import { toCss } from "@pantoken/css";
 * import { byTheme } from "@pantoken/tokens";
 *
 * toCss(byTheme("canvas"), { scope: '[class*="instui"]' });
 * ```
 *
 * @example Post-process with a plugin css hook
 * ```ts
 * import { toCss } from "@pantoken/css";
 * import { tokens } from "@pantoken/tokens";
 *
 * toCss(tokens, {
 *   plugins: [
 *     {
 *       name: "focus",
 *       css: () => ({ append: ":focus-visible { outline: 2px solid var(--instui-focus-color); }" }),
 *     },
 *   ],
 * });
 * ```
 */
export function toCss(tokens: readonly Token[], options: ToCssOptions = {}): string {
  const { scope = ":root", plugins = [] } = options;

  const properties: PropertyRule[] = [];
  const declarations: [string, string][] = [];
  for (const token of tokens) {
    if (isContextual(token.value)) declarations.push([token.name, token.value]);
    else properties.push({ name: token.name, syntax: token.syntax, value: token.value });
  }

  let css = buildCssFile({
    comments: [
      "/* Instructure design tokens + icon set (pantoken) */",
      "/* Concrete tokens are registered with @property; themed/reference tokens are declarations. */",
    ],
    scope,
    properties,
    sections: [{ pairs: declarations }],
  });

  const prepends: string[] = [];
  const appends: string[] = [];
  for (const plugin of checkPlugins(plugins, "css")) {
    const c = plugin.css?.({ tokens: tokens as Token[], css });
    if (!c) continue;
    appendContribution(c, prepends, appends);
  }

  return [...prepends, css, ...appends].filter(Boolean).join("\n\n");
}

function appendContribution(c: CssContribution, prepends: string[], appends: string[]): void {
  if (c.prepend) prepends.push(marked(c.marker, c.prepend));
  const extraProps = (c.properties ?? [])
    .map(
      (p) =>
        `@property ${p.name} {\n  syntax: "${p.syntax}";\n  inherits: true;\n  initial-value: ${p.value};\n}`,
    )
    .join("\n\n");
  const extraDecls = c.declarations?.length
    ? `:root {\n${c.declarations.map(([n, v]) => `  ${n}: ${v};`).join("\n")}\n}`
    : "";
  const block = [extraProps, extraDecls, c.append].filter(Boolean).join("\n\n");
  if (block) appends.push(marked(c.marker, block));
}
